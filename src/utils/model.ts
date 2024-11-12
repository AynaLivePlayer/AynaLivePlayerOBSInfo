import type {MetaData} from "@/api/model";


export const MetaID = (meta: MetaData) => {
    return meta.Provider + "_" + meta.Identifier;
}
