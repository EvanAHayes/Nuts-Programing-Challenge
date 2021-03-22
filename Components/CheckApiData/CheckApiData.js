

//check if Thumbnail image is undefined 
export const CheckThumbnailImage = (findUndefined) => {
    if (typeof (findUndefined) === 'undefined') {
        return "https://1b0bbb9e89b4713adcc7-aea4cee2cb18344b328e3a03eff3ec4f.ssl.cf1.rackcdn.com/ece4edb2868a8225.cro-U2aFaCJE-thumb.jpg"
    } else {
        return findUndefined.url;
    }
}

//check if src image is undefined 
export const CheckFullImage = (findUndefined) => {
    if (typeof (findUndefined) === 'undefined') {
        return "https://1b0bbb9e89b4713adcc7-aea4cee2cb18344b328e3a03eff3ec4f.ssl.cf1.rackcdn.com/ece4edb2868a8225.cro-U2aFaCJE.jpg"
    } else {
        return findUndefined.url;
    }
}

//Check Price of api
export const CheckPrice = (findUndefined) => {
    if (typeof (findUndefined) === 'undefined') {
        return "N/A"
    } else {
        return Number((findUndefined.value.centAmount / 100).toFixed(2)).toLocaleString() + " ";
    }
}

//check Product info 
export const CheckProductInfo = (findUndefined) => {
    if (typeof (findUndefined) === 'undefined') {
        return "N/A"
    } else {
        return findUndefined.en;
    }
}

