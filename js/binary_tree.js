class BinaryTree {
    // inicializa a raiz como nula
    constructor() {
        this.root = null
    }

    //exibe o menor valor da arvore
    /* Comentário (01): --------------------------------------------------------------------------------------------------------
    * verifica se current é nulo, caso não seja 
    * ele busca na esquerda até encontar um que possui a esquerda nula
    * encontrando este nó, o mesmo é o menor valor
    */
    min() {
        let current = this.root
        if (current == null)
            return null
        while (current.left != null)
            current = current.left
        return current.content
    }

    //exibe o maior valor da arvore
    /* Comentário (02): --------------------------------------------------------------------------------------------------------
    * verifica se current é nulo, caso não seja 
    * ele busca na direita até encontar um que possui a direita nula
    * encontrando este nó, o mesmo é o maior valor
    */
    max() {
        let current = this.root
        if (current == null)
            return null
        while (current.right != null)
            current = current.right
        return current.content
    }

    //insere o elemento da arvores
    /*  Comentário (03): --------------------------------------------------------------------------------------------------------
    * Insere um node na arvore chamando o metodo 'inserteNode' passando o node root que inicializar a árvore
    * que e de onde ira iniciar a insercão e passa o 
    * elemento que sera inserido na arvore e esse metodo
    * ira retorna a referencia do node.
    */
    insert(element) {
        this.root = this.insertNode(this.root, element)
    }
        
    /* Comentário (04): --------------------------------------------------------------------------------------------------------
    * verifica se o rootNode esta null, se estiver null retorna um new Node.
    * caso ele não esteja null o segundo if faz uma comparação do element com
    * o conteudo que esta no rootNode se for menor que o element o node será inserido
    * na direita da arvore, no else inserido na esquerda.
    */
    insertNode(rootNode, element) {
        if (rootNode == null)
            return new Node(element)
        if (element > rootNode.content)
            rootNode.right = this.insertNode(rootNode.right, element)
        else
            rootNode.left = this.insertNode(rootNode.left, element)
        return rootNode
    }
 
    //executa a função callback para cada nó, em ordem
    inOrderTraverse(callback) {
        this.inOrderVisitor(this.root, callback)
    }
    
    /* Comentário (05): --------------------------------------------------------------------------------------------------------
    * verifica se o node esta null se não estiver null
    * ele ira mostra em orden.
    * quando os node da esquerda acabar ele chama o callback
    * para o node.content
    */
    inOrderVisitor(node, callback) {
        if (node == null)
            return
        this.inOrderVisitor(node.left, callback)
        callback(node.content)
        this.inOrderVisitor(node.right, callback)
    }

    //executa a função callback para cada nó, em pré-ordem
    preOrderTraverse(callback) {
        this.preOrderVisitor(this.root, callback)
    }
    
    /* Comentário (06): --------------------------------------------------------------------------------------------------------
    * vericfia se o nó estiver nulo
    * como se trata de uma pré ondem, se começa mostrando a raiz
    * mostra o conteúdo do nó
    * mostra em pré-ordem a esquerda do nó
    * mostra também em pré-ordem a direita do nó
    */
    preOrderVisitor(node, callback) {
        if (node == null)
            return
        callback(node.content)
        this.preOrderVisitor(node.left, callback)
        this.preOrderVisitor(node.right, callback)
    }

    //executa a função callback para cada nó, em pós-ordem
    postOrderTraverse(callback) {
        this.postOrderVisitor(this.root, callback)
    }
    
    /* Comentário (07): --------------------------------------------------------------------------------------------------------
    * mostra em pós-ordem a esquerda do nó
    * mostra também em pré-ordem a direita do nó
    * além de mostrar o conteúdo do nó
    */
    postOrderVisitor(node, callback) {
        if (node == null)
            return
        this.postOrderVisitor(node.left, callback)
        this.postOrderVisitor(node.right, callback)
        callback(node.content)
    }
    
    /* Comentário (08): --------------------------------------------------------------------------------------------------------
    *   Busca na árvore binária
    *   verifica se é nulo
    *   verifica se é igual ao conteúdo
    *   veifica se é maior que o conteúdo
    *   busca de direita
    *   busca na esquerda
    */
    search(value) {
        return this.searchVisitor(this.root, value)
    }
    
    // Busca recursiva
    /* Comentário (09): --------------------------------------------------------------------------------------------------------
    * verifica se node é nulo, caso seja retorna 'false'
    * caso não seja, verifica se é igual, caso seja retorna 'true'
    * verifica se o conteúdo é maior que o 'element'
    * passa a direita do nó
    * se não, passar a esquerda do nó 
    */
    searchVisitor(node, element) {
        if (node == null)
            return false
        if (node.content == element)
            return true;
        if (element > node.content)
            return this.searchVisitor(node.right, element)
        else
            return this.searchVisitor(node.left, element)
    }

    //remove um elemento existente na árvore e retorna
    remove(value) {
        this.root = this.removeVisitor(this.root, value)
    }
    
    /* Comentário (10): --------------------------------------------------------------------------------------------------------
    * verifica se o 'node.value' é igual ao valor
    * caso seja, verifica se a esquerda do nó e a dirita do nó são iguais, caso sejam, não há 'filhos'
    * caso a esquerda e a direita sejam diferentes
    * verifica se a direita é nula, caso seja, não há filos na direita
    * se não, verifica se a esquerda é nula, caso seja, não há filos na esquerdda
    * caso contrário, possui ambos os ramos 
    *
    * verifica se enquanto 'node.left' for diferente de nulo, vá para o próximo, 'current = current.left' até encontrar a extrema esquerda
    *
    * caso o valor não seja igual
    * verifica se o valor é menor que o 'node.content'
    * caso seja, remove a esquerda
    * e retorna a árvore atualizada
    * caso contrário, é considerado maior
    */
    removeVisitor(node, value) {
        if (node.content == value) {
            if (node.left == node.right) {
                //nao tem filhos - Grau 0
                return null
            } else if (node.right == null) {
                //não tem filhos na direita, e tem nó na esqueda - Grau 1
                return node.left
            } else if (node.left == null) {
                //não tem filhos da esquerda, e tem nó da direita - Grau 1
                return node.right
            } else {
                // tem os dois ramos - Grau 2
                const newRoot = node.right
                let current = node.right;
                while (current.left != null)
                    current = current.left
                current.left = node.left
                return newRoot;
            }
        } else if (value < node.content) {
            node.left = this.removeVisitor(node.left, value)
        } else {
            node.right = this.removeVisitor(node.right, value)
        }
        return node;
    }

    //exibe a altura da arvore
    height() {
        return this.heightVisitor(this.root)
    }
    
    // 
    /* Comentário (11): --------------------------------------------------------------------------------------------------------
    * verifica se o nó é nulo, caso seja, retorna -1
    * caso não seja nulo, navega na esquerda e na direita
    * verifica qual é o maior e retorna o valor dele + 1
    */
    heightVisitor(node) {
        if (!node)
            return -1
        let leftHeight = this.heightVisitor(node.left),
            rightHeight = this.heightVisitor(node.right)
        return Math.max(leftHeight, rightHeight) + 1
    }

    // informa quantos nós existem na árvore
    size() {
        return this.sizeVisitor(this.root)
    }
    // 
    /* Comentário (12): --------------------------------------------------------------------------------------------------------
    * retorna o tamanho apartir da raiz da árvore
    * se o nó for igual a nulo, retorna 0
    * se o nó for diferente de nulo, retorna o valor da esquerda + o valor da direita + 1
    */
    sizeVisitor(node) {
        if (!node)
            return 0
        return this.sizeVisitor(node.left) + this.sizeVisitor(node.right) + 1
    }
}
