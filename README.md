# @guilelab/tools

Essa é uma pequena biblioteca "canivete suíço" com funções e ferramentas de uso comum
<br/>
<br/>


## Classe GuileMath

#### GuileMath.choice(...items: any[]): any
Uso:
```js
const { GuileMath } = require("@guilelab/tools")

const fruits = ["banana", "mango", "pineapple", "grape"];
const choicedFruit = GuileMath.choice(...fruits);

console.log("There is a random fruit: %s", choicedFruit);
```


## Classe GuileTreeNode

```js

const { GuileTreeNode } = require("@guilelab/tools")

const options = {
    key: "any-key", //Chave do nó
    parent: "parent-key", //Chave do nó pai
    extras: { ... }, //Qualquer dado desejado
    childrens: [{
        key: "any-key-2",
        parent: "parent-key-2",
        ...
    }] //Nós filhos seguindo a mesma lógica do options
}

//Construtor da árvore de nós
const tree = new GuileTreeNode(options);

//Corrigir o id dos filhos com base no id do pai
const correctParentKeys = GuileTreeNode.fillParent(tree);

//Converter árvore para lista
const listFromTree = GuileTreeNode.treeToList(correctParentKeys);

/* 
    Converter lista para árvore. É possível passar no segundo parametro o nó em que se deseja montar a estrutura.
*/
const treeFromList = GuileTreeNode.listToTree(listFromTree)
```

## Classe GuileGigaNumber

```js
const { GuileGigaNumber } = require("@guilelab/tools")

const HUNDRED_THOUSAND = 100000;

//Um numero em string com o 18 repetido 100.000 vezes (200.000 digitos)
const reallyBigNumber = "18".repeat(HUNDRED_THOUSAND);
//Um outro numero em string com o 85 repetido 100.000 vezes (200.000 digitos)
const reallyBigNumber2 = "85".repeat(HUNDRED_THOUSAND);

//Realiza uma soma, o resultado é retornado em uma string
const resultPlus = GuileGigaNumber.add(
	reallyBigNumber,
	reallyBigNumber2
)

console.log('Num. de digitos:', resultPlus.length);
console.log('Resultado %s...', resultPlus.substring(0, 100));

//Calcula a potencia de 10^1000
const muchMoreThanOneGoogol = GuileGigaNumber.pow("10", "1000")
console.log('Num. de digitos:', muchMoreThanOneGoogol.length);
console.log('Resultado %s...', muchMoreThanOneGoogol.substring(0, 100));

```

## Classe GuileArray

```js
const { GuileArray } = require("@guilelab/tools")


//Retorna o primeiro item da array ou um valor default
console.log(GuileArray.firstOrDefault([1, 2, 3], "s/v")) // 1
console.log(GuileArray.firstOrDefault([], "s/v")) // 1

//Retorna o ultimo item da array ou um valor default
console.log(GuileArray.lastOrDefault([1, 2, 3], "s/v")) // 3
console.log(GuileArray.lastOrDefault([], "s/v")) // 1

//Quebra a array em subarrays de tamanho igual ou menor do que o informado
console.log(GuileArray.chunk([1, 2, 3], 2)) // [[1, 2], [3]]


//Injeta as funções dentro de Array
GuileArray.injectToGlobalMethods();

console.log([1 ,2 ,3].firstOrDefault("s/v")) // 1
console.log([].firstOrDefault("s/v")) // "s/v"

console.log([1 ,2 ,3].lastOrDefault("s/v")) // 3
console.log([].lastOrDefault("s/v")) // "s/v"

console.log([1 ,2 ,3].chunk(2)) // [[1, 2], [3]]

```
