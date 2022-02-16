const result = document.getElementById("result")
let link = ""

const encode = {
    aes: (text, key) => {
        const encrypt = CryptoJS.AES.encrypt(text, key).toString()
        return encrypt
    },
    base: (text) => {
        const encodedWord = CryptoJS.enc.Utf8.parse(text)
        const encoded = CryptoJS.enc.Base64.stringify(encodedWord)
        return encoded
    },
}

const decode = {
    base: (encoded) => {
        const encodedWord = CryptoJS.enc.Base64.parse(encoded.replace(/\s+/g, ''))
        const decoded = encodedWord.toString(CryptoJS.enc.Utf8)
        return decoded
    },
    aes: (encrypted, secretKey) => {
        let bytes = CryptoJS.AES.decrypt(encrypted, secretKey)
        let decrypted = bytes.toString(CryptoJS.enc.Utf8)
        return decrypted
    },
}

function crypting () {
    const type = document.querySelector("input[name=type]:checked").value
    const description = document.getElementById("description").value
    const key = document.getElementById("key").value
    let href = document.querySelector("button")
    
    result.value = ""
    href.style.display = "none"
    if (type == "encode") encoding(description, key)
    else if (type == "decode") decoding(description, key)
}

function encoding(description, key) {
    let encoding = description
    for(let i = 0; i < 5; i++) {
        encoding = encode.base(encoding)
    }
    encoding = encode.aes(encoding, key)
    result.value = encoding
}

function decoding(description, key) {
    let decoding = decode.aes(description, key)
    let href = document.querySelector("button")
    for(let i = 0; i < 5; i++) {
        decoding = decode.base(decoding)
        if (!decoding) return result.value = "올바른 값을 입력해 주십시오..."
    }
    result.value = decoding
    if (decoding.slice(0, 4) == "http") {
        link = decoding
        href.style.display = "block"
    }
}

function openLink() {
    window.open(
        link,
        '_blank'
    )
}