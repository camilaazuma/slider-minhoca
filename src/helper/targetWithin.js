const containsNode = (parent, child) => parent === child || (parent.contains && parent.contains(child));
/**
 * Check if target is inside of list elements
 * {HTMLElement} target element to be checked
 * {HTMLElement[]} elements reference element where will it be checked the target
 */
const targetWithin = (target, elements) => elements.some(node => node && containsNode(node, target));

export default targetWithin;