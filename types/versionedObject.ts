import UserId from "./userId";

export class VersionedObject {
    constructor(
        readonly id: string, 
        readonly owner: UserId, 
        readonly versionIds: number[], 
        readonly publiclyVisible: boolean, 
        readonly publiclyEditable: boolean) {}
}

export class VersionedObjectVersion {
    constructor(
        readonly id: number,
        readonly date: Date,
        readonly versionName: string | null,
        readonly contributors: UserId[],
        readonly payload: object) {}
}