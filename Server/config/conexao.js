var express = require('express')
var app = express()
var firebird = require('node-firebird')

const conexao = () => {
    var options = {};

    options.host = '192.168.1.253';
    options.port = 3054;
   // options.database = 'E:/Tek-System/Ant/DADOSMC_Homologacao.FDB';
     options.database = 'E:/TEK-SYSTEM/DADOS/DADOSMC.FDB';
    options.user = 'SYSDBA';
    options.password = 'masterkey';
    options.lowercase_keys = false; // set to true to lowercase keys
    options.role = null; // default
    options.pageSize = 4096;

    return options
}

module.exports = conexao()