import React from "react"

// Customize the name import
export const lazyLoader = (path: string,nameExport?: string) => {
    return React.lazy(() => {
        const promise = import(path);
        if(nameExport) {
           return promise.then(module => ({ default: module[nameExport]}));
        } else {
           return promise;
        }
    })
}