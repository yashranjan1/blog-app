import { proxy } from "valtio";

const store = proxy({
    image64: ""
})

export const updateImage = (newImage) => {
    store.image64 = newImage
}


export default store;