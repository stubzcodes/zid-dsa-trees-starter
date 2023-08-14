class BinarySearchTree {
  // your code here
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if(this.key == key) {
      return this.value;
    } else if (key < this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    } else {
      throw new Error("Key not found")
    }
  }

  remove(key) {
    if(this.key == key) {
      if(this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(right);
      } else {
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.left) {
      this.left.remove(key);
    } else {
      throw new Error("Key not found")
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      }
      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
      this.key = node.key;
      this.value = node.value;
      this.left = node.left;
      this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  dfsInOrder(values = []) {
    if (this.left) {
      values = this.left.dfsInOrder(values);
    }

    values.push(this.value);

    if(this.right) {
      values = this.right.dfsInOrder(values);
    } 
    return values;
  }

  dfsPreOrder(values = []) {
    values.push(this.value);

    if (this.left) {
      values = this.left.dfsPreOrder(values);
    }

    if(this.right) {
      values = this.right.dfsPreOrder(values);
    }
    return values;
  }

  dfsPostOrder(values = []) {
    if(this.left) {
      values = this.left.dfsPostOrder(values);
    }

    if(this.right) {
      values = this.right.dfsPostOrder(values);
    }

    values.push(this.value);

    return values;
  }
}


const bst = new BinarySearchTree(5,5)

bst.insert(2,2)
bst.insert(20, 20)
bst.insert(1,1)
bst.insert(27, 27)

console.log(bst.dfsInOrder());
console.log(bst.dfsPreOrder());
console.log(bst.dfsPostOrder());