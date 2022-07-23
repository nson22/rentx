# Cadastro de carros

## Requisitos funcionais

- Deve ser possível cadastrar um novo _carro_.
- Deve ser possível listar todas as _categorias_.

## Requisitos não funcionais

- TBD

## Regra de negócios

- Não deve ser possível cadastrar um _carro_ com placa já existente;
- Não deve ser possível alterar a placa de um _carro_ já cadastrado;
- O _carro_ deve ser cadastrado com disponibilidade por padrão;
- O usuário responsável pelo cadastro dever ser um _administrador_.

# Listagem de carros

## Requisitos funcionais

- Deve ser possível listar todos os _carros_ disponiveis.
- Deve ser possível listar todos os _carros_ disponiveis pelo nome da _categoria_.
- Deve ser possível listar todos os _carros_ disponiveis pelo nome da _marca_.
- Deve ser possível listar todos os _carros_ disponiveis pelo nome do _carro_.

## Requisitos não funcionais

- TBD

## Regra de negócios

- O usuário não precisa estar logado no sistema para listar os _carros_ disponiveis.

# Cadastro de especificação dos carros

## Requisitos funcionais

- Deve ser possível cadastrar uma _especificação_ para um _carro_;
- Deve ser possível listar todas as _espeficificações_;
- Deve ser possível listar todos os _carros_.

## Requisitos não funcionais

- TBD

## Regra de negócios

- Não deve ser possível cadastrar uma _especificação_ para um carro não cadastrado;
- Não deve ser possível cadastrar uma _especificação_ já existente para um carro;
- O usuário responsável pelo cadastro dever ser um _administrador_.

# Cadastro de imagens dos carros

## Requisitos funcionais

- Deve ser possível cadastrar as _imagens_ dos _carros_

## Requisitos não funcionais

- Utilizar o multer para upload dos arquivos de _imagens_.
- Deve ser possível listar todos os _carros_ disponiveis.

## Regra de negócios

- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro;
- O usuário responsável pelo cadastro dever ser um _administrador_.

# Aluguel dos carros

## Requisitos funcionais

- Deve ser possível cadastrar um _aluguel_ de _carros_

## Requisitos não funcionais

-TBD

## Regra de negócios

- O _aluguel_ deve ter a duração mínima de 24 horas;
- Não deve ser possível cadastrar um novo _aluguel_ caso já exista um aberto para o mesmo _usuário_;
- Não deve ser possível cadastrar um novo _aluguel_ caso já exista um aberto para o mesmo _carro_;
