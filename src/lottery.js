import web3 from './web3'
import abi from './abi.json'


const address = "0x656144c528bb0501F66B0335C7FC0bd9345C8B0c";

export default new web3.eth.Contract(abi,address)