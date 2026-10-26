/**
 * Parche defensivo para Node.prototype.removeChild y Node.prototype.insertBefore.
 *
 * Resuelve el bug histórico de React (#11538 / #20770) donde extensiones del navegador
 * o traductores automáticos (como Google Translate) mutan el DOM real envolviendo o moviendo
 * nodos en etiquetas <font>. Cuando React intenta desmontar o insertar sobre un nodo cuyo
 * parentNode ya no coincide con el contenedor esperado, el navegador lanza:
 * 'NotFoundError: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.'
 *
 * Con este parche, si el nodo no es hijo de este contenedor, se intercepta la llamada
 * evitando que la aplicación de React colapse por completo.
 */

if (typeof window !== 'undefined' && typeof Node === 'function' && Node.prototype) {
    const originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function <T extends Node>(child: T): T {
        if (child.parentNode !== this) {
            if (import.meta.env?.DEV) {
                console.warn(
                    'DOM Patch: El nodo a eliminar no es hijo de este contenedor. Omitiendo removeChild para evitar crash en React:',
                    child,
                    this
                );
            }
            return child;
        }
        return originalRemoveChild.call(this, child) as T;
    };

    const originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function <T extends Node>(newNode: T, referenceNode: Node | null): T {
        if (referenceNode && referenceNode.parentNode !== this) {
            if (import.meta.env?.DEV) {
                console.warn(
                    'DOM Patch: El nodo de referencia no es hijo de este contenedor. Omitiendo insertBefore para evitar crash en React:',
                    referenceNode,
                    this
                );
            }
            return newNode;
        }
        return originalInsertBefore.call(this, newNode, referenceNode) as T;
    };
}

export {};
