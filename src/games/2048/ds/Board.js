const _row = Symbol("row");
const _col = Symbol("col");

/**
 * align grids by forward and merge the neighboring grids which has same value and remove empty grids.
 * @param {Array} grids
 * @param {Boolean} forward
 * @param {Number} maxLevel
 * @returns {any}
 */
function transform(grids, forward, maxLevel) {
    // 倒置标记位, 左移为 1， 右移为 -1.
    const reversed = forward ? -1 : 1;
    grids = grids.map((value, index) => {
        return { value, index };
    });
    //   消除格子之间的空位，向左或者向右对齐
    grids.sort((a, b) => {
        // 处理空位的代码：
        // 如果，右边(即 a)为空位左边不为空位，如果是右移那就颠倒位置，左移位置不变。
        if (a.value < 0 && b.value >= 0) return reversed;
        // 如果，右边(即 a)不为空位左边为空位，如果是左移那就颠倒位置，右移则不变。
        if (a.value >= 0 && b.value < 0) return -reversed;
        // 不然位置也是不变的。
        return a.index - b.index;
    });

    grids.forEach((grid, i) => {
        grid.toIndex = i;
    });
    // 合并可以合并的格子
    let score = 0;
    grids = forward ? grids.reverse() : grids;
    let latest = -1;
    let offset = 0;
    for (let i = 0; i < grids.length; i++) {
        let grid = grids[i];
        if (latest >= 0 && latest === grid.value && latest < maxLevel) {
            grids[i - 1].toValue = grids[i - 1].value + 1;
            score += getScore(grids[i - 1].toValue);
            grid.toValue = -1;
            latest = grid.toValue;
            offset -= reversed;
        } else {
            grid.toValue = grid.value;
            latest = grid.value;
        }
        grid.toIndex += offset;
    }
    //   过滤空格子
    return {
        score,
        grids: grids.filter((grids) => grids.value >= 0),
    };
}

function getScore(i) {
    return 2 ** i;
}

export default class Board {
    /**
     * @param {Number} size
     * @param {Number} maxLevel
     */
    constructor({
        size = 4,
        maxLevel = 11,
        score = 0,
        board,
        isMoved,
        gameOver,
    }) {
        this.size = size;
        this.score = score;
        this.maxLevel = maxLevel;
        // 注意这里不能使用 new Array 初始化，形成的空位会被 mapApi 忽略。
        this.board =
            JSON.parse(JSON.stringify(board)) ||
            Array.from({ length: size }).map((row) => new Array(size).fill(-1));
        this.isMoved = isMoved;
        this.gameOver = gameOver;
    }
    /**
     * birth is a function to create new numbers on board.
     * @param {Number} level
     */
    birth(level = 1) {
        if (level >= this.maxLevel) {
            throw new Error("new number too big");
        }
        // 找出目前棋盘空位
        let spacesRemain = [];
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.board[i][j] === -1) {
                    spacesRemain.push([i, j]);
                }
            }
        }
        let n = spacesRemain.length;
        if (n) {
            // 随机生成位置
            let idx = Math.floor(Math.random() * n);
            //   生成新块
            let [i, j] = spacesRemain[idx];
            this.board[i][j] = level;
            return this;
            // return spacesRemain[idx];
        }
        this.gameOver = true;
        // 没有空位
        return this;
        // return [-1, -1];
    }

    /**
     * get a copied row from the board
     * @param {Number} i
     * @returns {Array}
     */
    getRow(i) {
        if (i < 0 || i >= this.size) {
            throw new Error("illegal row idx.");
        }
        return this.board[i].slice(0);
    }
    /**
     * get a copied col from the board
     * @param {Number} j
     * @returns {Array}
     */
    getCol(j) {
        if (j < 0 || j >= this.size) {
            throw new Error("illegal row idx.");
        }
        let col = [];
        for (let i = 0; i < this.size; i++) {
            col.push(this.board[i][j]);
        }
        return col;
    }
    /**
     * _row tranform the board and memorize the changes when the moving direction is left or right.
     * @param {Boolean} forward
     * @returns {Array}
     */
    [_row](forward) {
        const board = this.board;
        const changes = [];
        let newScore = this.score;
        // 对棋盘的每一行进行变换，并且记录改变的单元格
        for (let i = 0; i < this.size; i++) {
            //   获取变化完之后的单元格
            let { score, grids } = transform(
                this.getRow(i),
                forward,
                this.maxLevel
            );
            // 更新棋盘
            for (let j = 0; j < this.size; j++) {
                board[i][j] = -1;
            }
            grids.forEach((grid) => {
                let { index, toIndex, toValue } = grid;
                grid.index = [i, index];
                grid.toIndex = [i, toIndex];
                if (toValue >= 0) {
                    board[i][toIndex] = toValue;
                }
            });
            // 记录变化值
            newScore += score;
            changes.push(...grids);
        }
        // 更新分数
        this.score = newScore;
        // 返回真正发生改变的单元格
        return changes.filter((grid) => {
            return (
                grid.index[0] !== grid.toIndex[0] ||
                grid.index[1] !== grid.toIndex[1] ||
                grid.value !== grid.toValue
            );
        });
    }
    /**
     * row move backward
     * @returns {Array}
     */
    left() {
        let changes = this[_row]();
        this.isMoved = changes.length > 0;
        return this;
    }
    /**
     * row move forward
     * @returns {Array}
     */
    right() {
        let changes = this[_row](true);
        this.isMoved = changes.length > 0;
        return this;
    }
    /**
     * _col tranform the board and memorize the changes when the moving direction is up or down.
     * @param {Boolean} forward
     * @returns {Array}
     */
    [_col](forward) {
        const board = this.board;
        const changes = [];
        let newScore = this.score;
        // 对棋盘的每一行进行变换，并且记录改变的单元格
        for (let j = 0; j < this.size; j++) {
            //   获取变化完之后的单元格
            let { score, grids } = transform(
                this.getCol(j),
                forward,
                this.maxLevel
            );
            // 更新棋盘
            for (let i = 0; i < this.size; i++) {
                board[i][j] = -1;
            }
            grids.forEach((grid) => {
                let { index, toIndex, toValue } = grid;
                grid.index = [index, j];
                grid.toIndex = [toIndex, j];
                if (toValue >= 0) {
                    board[toIndex][j] = toValue;
                }
            });
            //   记录变化值
            newScore += score;
            changes.push(...grids);
        }
        // 返回真正发生改变的单元格
        this.score = newScore;
        return changes.filter((grid) => {
            return (
                grid.index[0] !== grid.toIndex[0] ||
                grid.index[1] !== grid.toIndex[1] ||
                grid.value !== grid.toValue
            );
        });
    }
    /**
     * col move backward
     * @returns {Array}
     */
    up() {
        let changes = this[_col]();
        this.isMoved = changes.length > 0;
        return this;
    }
    /**
     * col move backward
     * @returns {Array}
     */
    down() {
        let changes = this[_col](true);
        this.isMoved = changes.length > 0;
        return this;
    }
    /**
     * @return {string}
     */
    toString() {
        let str = "";
        this.board.forEach((row) => {
            row.forEach((grid) => {
                grid = grid === -1 ? "ø" : grid;
                str += `${grid}\t`;
            });
            str += "\n\n";
        });
        return str;
    }
}
