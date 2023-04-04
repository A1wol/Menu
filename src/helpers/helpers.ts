export function doObjectOrArrayExistsAndNotNull(obj: (object | Array<[]>)) {
    return obj !== undefined && obj !== null
}