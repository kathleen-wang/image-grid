// affixing proxyUrl to api in order to bypass CORS error 
const proxyUrl = "https://cors-anywhere.herokuapp.com/"
const base = 'http://s3.amazonaws.com/adproto.cdo.com/AssetModel.json' 

const url = proxyUrl + base
export default url 