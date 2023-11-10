# Escrita de Políticas e Especificações baseado em DDD de Eric Evans

## Introdução

A escrita de políticas e especificações é uma parte importante do desenvolvimento de software, especialmente quando se segue a abordagem de Domain-Driven Design (DDD) de Eric Evans. As políticas e especificações ajudam a definir o comportamento esperado do sistema em diferentes cenários e a garantir que o software atenda aos requisitos do negócio. Vamos explorar como escrever políticas e especificações usando DDD.

## O que são Políticas e Especificações?

Políticas e especificações são regras que definem o comportamento esperado do sistema em diferentes cenários. As políticas são geralmente mais abstratas e definem o comportamento geral do sistema, enquanto as especificações são mais detalhadas e definem o comportamento em cenários específicos. As Políticas são compostas por uma ou mais Especificações.

## Escrevendo Políticas

As políticas são escritas em linguagem natural e descrevem o comportamento geral do sistema. Elas devem ser claras e concisas, e devem ser escritas em termos de negócios, em vez de termos técnicos. Aqui está um exemplo de uma política para um Sistema de Pedidos:

| Política | Descrição |
| --- | --- |
| O sistema deve impor aos usuários limites na criação de Pedidos, baseado em nossas políticas de vendas | O sistema deve garantir que usuários, baseados em dados coletados, tenham ações individualizadas quando estão montando seu Pedido. Fatores como idade e quantidade de itens por pedido são algumas dessas restrições  |

## Escrevendo Especificações

As especificações são escritas em linguagem natural e descrevem o comportamento esperado do sistema em cenários específicos. Elas devem ser claras e concisas, e devem ser escritas em termos de negócios, em vez de termos técnicos. Aqui está um exemplo de uma especificação para a política acima:

| Especificação (Validação) | Descrição |
| --- | --- |
| O sistema deve bloquear a venda de bebidas do tipo alcoólica para menores de idade  | Quando um usuário tentar criar um Pedido e for menor de idade (18 anos), o sistema deve retornar uma mensagem de erro e bloquear a criação do Pedido. Mensagem: "User is not allowed to buy alcoholic drinks"  |

Agora, outra especificação, dessa vez relacionada a uma política de descontos.

| Especificação (Construção) | Descrição |
| --- | --- |
| O sistema deve dar um desconto para Produtos com data de validade próxima  | Quando um usuário comprar Produtos com a data de validade próxima (uma lista de Produtos está disponível), o usuário deve receber 10% de desconto  |


## Codando Especificações

Drink Specification Class
```
// DrinksSpecification.ts
export default class DrinksSpecification extends BaseSpecification {
    
    constructor(private user: User, private products: ProductToSellProps[]) {
        super();
    }
    
    async isSatisfied(): Promise<boolean> {
        if (this.user.age < 18 && this.products.some(product => product.category == ProductCategories.ALCOHOLIC_DRINK)) {
            this.setError(new BaseError("User is not allowed to buy alcoholic drinks"));
            return this.sendResult(false);
        }
        return this.sendResult(true);
    }
}
```

Product to Expire Specification Class
```
// ProductToExpireSpecification.ts
export default class ProductToExpireSpecification extends BaseSpecification {
    constructor(private product: ProductToSellProps, private productsToExpire: string[]) {
        super();
    }
    
    async isSatisfied(): Promise<boolean> {
        if (this.productsToExpire.some( toExpire => toExpire === this.product.name)) {
            return this.sendResult(true);
        }
        return this.sendResult(false);
    }
}
```
