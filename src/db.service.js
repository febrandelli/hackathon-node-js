const mysql = require('mysql');

let conexao = null;

module.exports = {
  conectar,
  inserirEmpresa,
  inserirEventos
}

function conectar(options) {
  if (conexao == null) {
    return new Promise((resolve, reject) => {

      console.log('Iniciando conexão em banco de dados');

      conexao = mysql.createConnection({
        host: options.host,
        port: options.porta,
        database: options.banco,
        user: options.usuario,
        password: options.senha
      });

      conexao.connect(erro => {
        if (erro) {
          console.error('Erro ao conectar no banco de dados', erro);
          reject(erro);
        } else {
          console.log('Conectado ao banco de dados');
          resolve();
        }
      });

    });
  } else {
    console.log('Aplicação ja esta conectada ao banco de dados');
    return Promise.resolve(conexao);
  }
}

function inserirEmpresa(empresa) {
  const sql = 'INSERT INTO EMPRESAS SET NOME = ?';

  conexao.query(sql, [empresa.trim()], (erro, results) =>{
    if (erro) {
      console.log('erro')
    } else {
      console.log('Deu certo',results);
      results.insertId;
      
    }
  });
}
function inserirEventos(categoria,dia,horario,descrição,id_empresa){
  const sql = 'INSERT INTO EVENTOS SET CATEGORIA = ?, DIA = ?,HORARIO = ?,DESCRICAO = ?, ID_EMPRESA = ?';

  conexao.query(sql, [categoria.trim(),dia.trim(),horario,descrição.trim(),id_empresa], (erro, results) =>{
    if (erro) {
      console.log('erro',erro)
    } else {
      console.log('Deu certo',results)
      
    }
  });
}