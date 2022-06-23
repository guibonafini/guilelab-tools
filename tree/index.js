module.exports = class GuileTreeNode {
    key = null
    depth = null
    parent = null
    extras = {}
    childrens = []

    constructor({ key, depth, parent, extras, childrens }) {
        this.key = key;
        this.depth = depth;
        this.parent = parent;
        this.extras = extras;
        if(childrens.length > 0) {
            this.childrens = childrens.map((child) => {
                return new GuileTreeNode(child)
            })
        }
    }

    static listToTree(nodeList, rootNode = null) {
        if (!rootNode) {
            rootNode = new GuileTreeNode({ depth: 0 });
        }

        rootNode.childrens = nodeList.filter(node => node.parent == rootNode.key).map((node) => {
            node.depth = rootNode.depth + 1
            return GuileTreeNode.listToTree(nodeList, node)
        })

        return rootNode;
    }

    static treeToList(node) {
        const list = [];
        const { nodeChildrens, ...nodeData } = node;

        list.push(nodeData)

        if (nodeChildrens.length > 0) {
            list.push(
                ...nodeChildrens.reduce((childList, child) => {
                    childList.push(...GuileTreeNode.treeToList(child))
                    return childList
                }, [])
            );
        }

        return list;
    }

    static fillParent(rootNode) {
        if (rootNode.childrens.length > 0) {
            rootNode.childrens.forEach(node => {
                node.parent = rootNode.key;
                GuileTreeNode.fillParent(node);
            });
        }
        return rootNode;
    }
}