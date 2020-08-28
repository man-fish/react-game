export default class EventEmitter {
    constructor() {
        // 缓存列表
        this.list = {};
    }
    // 订阅
    on(event, handler) {
        // 如果对象中没有对应的 event 值，也就是说明没有订阅过，就给 event 创建个缓存列表
        // 如有对象中有相应的 event 值，把 fn 添加到对应 event 的缓存列表里
        (this.list[event] || (this.list[event] = [])).push(handler);
    }
    // 发布
    emit(...args) {
        // 第一个参数为 event，先取出
        let event = args.shift();
        // 提取订阅事件的执行回调
        let fns = [...this.list[event]];
        if (!fns || fns.length === 0) {
            return false;
        }
        fns.forEach((fn) => {
            // 将剩余参数传入回调
            fn(...args);
        });
    }
    // 监听一次
    once(event, fn) {
        // 封装成一个调用后删除自己的事件
        let onceHandler = (...args) => {
            this.off(event, on);
            fn(...args);
        };
        onceHandler.fn = fn;
        // 绑定封装的事件
        this.on(event, onceHandler);
    }
    // 取消订阅
    off(event, fn) {
        let fns = this.list[event];
        // 如果缓存列表中没有相应的 fn，返回false
        if (!fns) {
            return false;
        }
        if (!fn) {
            fns.length = 0;
        } else {
            // 若有 fn，遍历缓存列表，看看传入的 fn 与哪个函数相同，如果相同就直接从缓存列表中删掉即可
            for (let i = 0, ob = fns[i], obLen = fns.length; i < obLen; i++) {
                if (ob === fn || ob.fn === fn) {
                    // 后半部分判断是为了 once 方法
                    fns.splice(i, 1);
                    break;
                }
            }
        }
    }
}
