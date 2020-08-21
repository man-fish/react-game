export function byteTransform(nBytes) {
    let sOutput = nBytes + " B";
    const aMultiples = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    for (
        let nMultiple = 0, nApprox = nBytes / 1024;
        nApprox > 1;
        nApprox /= 1024, nMultiple++
    ) {
        sOutput = nApprox.toFixed(2) + " " + aMultiples[nMultiple];
    }
    return sOutput;
}
