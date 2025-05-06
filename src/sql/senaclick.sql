DROP DATABASE IF EXISTS senaclick;
CREATE DATABASE IF NOT EXISTS senaclick CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE senaclick;

CREATE TABLE plano (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(20) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    artigo VARCHAR(100) NOT NULL,
    noticia VARCHAR(100) NOT NULL,
    edicao VARCHAR(100) NOT NULL,
    textoBotao VARCHAR(50) NOT NULL,
    classe VARCHAR(50) NOT NULL
);

CREATE TABLE cliente (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(250) NOT NULL,
    sobrenome VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE administrador (
    id_admin INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(250) NOT NULL,
    sobrenome VARCHAR(250) NULL,
    email VARCHAR(250) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE cliente_plano (
    id_cliente_plano INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT NOT NULL,
    id_plano INT NOT NULL,
    pagamento varchar(50),
    data_assinatura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id) ON DELETE CASCADE,
    FOREIGN KEY (id_plano) REFERENCES plano(id) ON DELETE CASCADE,
    UNIQUE (id_cliente, id_plano) -- Impede que o mesmo cliente assine o mesmo plano mais de uma vez
);

-- select * from plano;
-- select * from cliente;
-- select * from cliente_plano;
-- select * from administrador;



INSERT INTO plano (titulo, preco, artigo, noticia, edicao, textoBotao, classe) VALUES
('Básico', 0.00, 'Acesso a artigos selecionados', 'Notícias e novidade sobre o Senac', 'Edições limitada da revista', 'Selecionar', 'planoBasico'),
('Estudante', 9.90, 'somente últimos 6 meses', 'Conteúdo exclusivo para alunos', 'Desconto em eventos', 'Selecionar', 'planoEstudante'),
('Premium', 19.90, 'Acesso a artigos ilimitados', 'Conteúdo exclusivo para alunos', 'Desconto em eventos e workshops', 'Selecionar', 'planoPremium');

--  SELECT cliente.id, cliente.nome, plano.titulo, pagamento, plano.preco, data_assinatura
--             FROM cliente_plano
--             INNER JOIN cliente ON cliente_plano.id_cliente = cliente.id
--             INNER JOIN plano ON cliente_plano.id_plano = plano.id;

-- inserção de admin apenas via postman agora