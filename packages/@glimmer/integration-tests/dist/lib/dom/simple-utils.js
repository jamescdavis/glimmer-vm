import Serializer from '@simple-dom/serializer';
import voidMap from '@simple-dom/void-map';
import { clearElement } from '@glimmer/util';
export function toInnerHTML(parent) {
    let serializer = new Serializer(voidMap);
    return serializer.serializeChildren(parent);
}
export function toOuterHTML(parent) {
    let serializer = new Serializer(voidMap);
    return serializer.serialize(parent);
}
export function getElementByClassName(element, className) {
    let current = firstElementChild(element);
    while (current) {
        if (classList(current).indexOf(className) > -1) {
            return current;
        }
        else {
            let recurse = getElementByClassName(current, className);
            if (recurse)
                return recurse;
            current = nextElementSibling(current);
        }
    }
    return null;
}
export function getElementsByTagName(element, tagName, accum = []) {
    let tag = tagName.toUpperCase();
    let current = firstElementChild(element);
    while (current) {
        if (current.tagName === tag) {
            accum.push(current);
        }
        getElementsByTagName(current, tagName, accum);
        current = nextElementSibling(current);
    }
    return accum;
}
export function classList(element) {
    let attr = element.getAttribute('class');
    if (attr === null)
        return [];
    return attr.split(/\s+/);
}
export function toTextContent(parent) {
    return new TextSerializer(voidMap).serializeChildren(parent);
}
export function replaceHTML(parent, value) {
    clearElement(parent);
    parent.insertAdjacentHTML("afterbegin" /* afterbegin */, value);
}
export function assertElement(node) {
    if (!node || node.nodeType !== 1 /* ELEMENT_NODE */) {
        throw new Error(`Expected element, got ${node}`);
    }
    return node;
}
export function hasAttribute(parent, attr) {
    let attrs = parent.attributes;
    for (let i = 0; i < attrs.length; i++) {
        if (attrs[i].name === attr)
            return true;
    }
    return false;
}
export function firstElementChild(parent) {
    let current = parent.firstChild;
    while (current) {
        if (current.nodeType === 1 /* ELEMENT_NODE */) {
            return current;
        }
        current = current.nextSibling;
    }
    return null;
}
export function nextElementSibling(node) {
    let current = node.nextSibling;
    while (current) {
        if (current.nodeType === 1 /* ELEMENT_NODE */) {
            return current;
        }
        current = current.nextSibling;
    }
    return null;
}
export function elementId(element) {
    return element.getAttribute('id');
}
class TextSerializer extends Serializer {
    openTag(_element) {
        return '';
    }
    closeTag(_element) {
        return '';
    }
    text(text) {
        return text.nodeValue || '';
    }
    comment(_comment) {
        return '';
    }
    rawHTMLSection(_content) {
        throw new Error('Unexpected raw HTML section in serialized text');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL2RvbS9zaW1wbGUtdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBU0EsT0FBTyxVQUFVLE1BQU0sd0JBQXdCLENBQUM7QUFDaEQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFFM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU3QyxNQUFNLFVBQVUsV0FBVyxDQUFDLE1BQThDO0lBQ3hFLElBQUksVUFBVSxHQUFHLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pDLE9BQU8sVUFBVSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFFRCxNQUFNLFVBQVUsV0FBVyxDQUFDLE1BQThDO0lBQ3hFLElBQUksVUFBVSxHQUFHLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pDLE9BQU8sVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN0QyxDQUFDO0FBRUQsTUFBTSxVQUFVLHFCQUFxQixDQUNuQyxPQUFzQixFQUN0QixTQUFpQjtJQUVqQixJQUFJLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUV6QyxPQUFPLE9BQU8sRUFBRTtRQUNkLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUM5QyxPQUFPLE9BQU8sQ0FBQztTQUNoQjthQUFNO1lBQ0wsSUFBSSxPQUFPLEdBQUcscUJBQXFCLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRXhELElBQUksT0FBTztnQkFBRSxPQUFPLE9BQU8sQ0FBQztZQUU1QixPQUFPLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdkM7S0FDRjtJQUVELE9BQU8sSUFBSSxDQUFD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QUksQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFFRCxNQUFNLGNBQWUsU0FBUSxVQUFVO0lBQ3JDLE9BQU8sQ0FBQyxRQUE2QjtRQUNuQyxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRCxRQUFRLENBQUMsUUFBNkI7UUFDcEMsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQsSUFBSSxDQUFDLElBQXNCO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELE9BQU8sQ0FBQyxRQUEwQjtRQUNoQyxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRCxjQUFjLENBQUMsUUFBMEI7UUFDdkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFNpbXBsZUVsZW1lbnQsXG4gIFNpbXBsZURvY3VtZW50RnJhZ21lbnQsXG4gIEluc2VydFBvc2l0aW9uLFxuICBTaW1wbGVOb2RlLFxuICBOb2RlVHlwZSxcbiAgU2VyaWFsaXphYmxlRWxlbWVudCxcbiAgU2VyaWFsaXphYmxlTm9kZSxcbn0gZnJvbSAnQHNpbXBsZS1kb20vaW50ZXJmYWNlJztcbmltcG9ydCBTZXJpYWxpemVyIGZyb20gJ0BzaW1wbGUtZG9tL3NlcmlhbGl6ZXInO1xuaW1wb3J0IHZvaWRNYXAgZnJvbSAnQHNpbXBsZS1kb20vdm9pZC1tYXAnO1xuaW1wb3J0IHsgT3B0aW9uIH0gZnJvbSAnQGdsaW1tZXIvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBjbGVhckVsZW1lbnQgfSBmcm9tICdAZ2xpbW1lci91dGlsJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRvSW5uZXJIVE1MKHBhcmVudDogU2ltcGxlRWxlbWVudCB8IFNpbXBsZURvY3VtZW50RnJhZ21lbnQpOiBzdHJpbmcge1xuICBsZXQgc2VyaWFsaXplciA9IG5ldyBTZXJpYWxpemVyKHZvaWRNYXApO1xuICByZXR1cm4gc2VyaWFsaXplci5zZXJpYWxpemVDaGlsZHJlbihwYXJlbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9PdXRlckhUTUwocGFyZW50OiBTaW1wbGVFbGVtZW50IHwgU2ltcGxlRG9jdW1lbnRGcmFnbWVudCk6IHN0cmluZyB7XG4gIGxldCBzZXJpYWxpemVyID0gbmV3IFNlcmlhbGl6ZXIodm9pZE1hcCk7XG4gIHJldHVybiBzZXJpYWxpemVyLnNlcmlhbGl6ZShwYXJlbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWxlbWVudEJ5Q2xhc3NOYW1lKFxuICBlbGVtZW50OiBTaW1wbGVFbGVtZW50LFxuICBjbGFzc05hbWU6IHN0cmluZ1xuKTogT3B0aW9uPFNpbXBsZUVsZW1lbnQ+IHtcbiAgbGV0IGN1cnJlbnQgPSBmaXJzdEVsZW1lbnRDaGlsZChlbGVtZW50KTtcblxuICB3aGlsZSAoY3VycmVudCkge1xuICAgIGlmIChjbGFzc0xpc3QoY3VycmVudCkuaW5kZXhPZihjbGFzc05hbWUpID4gLTEpIHtcbiAgICAgIHJldHVybiBjdXJyZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcmVjdXJzZSA9IGdldEVsZW1lbnRCeUNsYXNzTmFtZShjdXJyZW50LCBjbGFzc05hbWUpO1xuXG4gICAgICBpZiAocmVjdXJzZSkgcmV0dXJuIHJlY3Vyc2U7XG5cbiAgICAgIGN1cnJlbnQgPSBuZXh0RWxlbWVudFNpYmxpbmcoY3VycmVudCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbGVtZW50c0J5VGFnTmFtZShcbiAgZWxlbWVudDogU2ltcGxlRWxlbWVudCxcbiAgdGFnTmFtZTogc3RyaW5nLFxuICBhY2N1bTogU2ltcGxlRWxlbWVudFtdID0gW11cbik6IFNpbXBsZUVsZW1lbnRbXSB7XG4gIGxldCB0YWcgPSB0YWdOYW1lLnRvVXBwZXJDYXNlKCk7XG4gIGxldCBjdXJyZW50ID0gZmlyc3RFbGVtZW50Q2hpbGQoZWxlbWVudCk7XG5cbiAgd2hpbGUgKGN1cnJlbnQpIHtcbiAgICBpZiAoY3VycmVudC50YWdOYW1lID09PSB0YWcpIHtcbiAgICAgIGFjY3VtLnB1c2goY3VycmVudCk7XG4gICAgfVxuXG4gICAgZ2V0RWxlbWVudHNCeVRhZ05hbWUoY3VycmVudCwgdGFnTmFtZSwgYWNjdW0pO1xuICAgIGN1cnJlbnQgPSBuZXh0RWxlbWVudFNpYmxpbmcoY3VycmVudCk7XG4gIH1cblxuICByZXR1cm4gYWNjdW07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGFzc0xpc3QoZWxlbWVudDogU2ltcGxlRWxlbWVudCk6IHN0cmluZ1tdIHtcbiAgbGV0IGF0dHIgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgaWYgKGF0dHIgPT09IG51bGwpIHJldHVybiBbXTtcbiAgcmV0dXJuIGF0dHIuc3BsaXQoL1xccysvKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvVGV4dENvbnRlbnQocGFyZW50OiBTaW1wbGVFbGVtZW50KTogc3RyaW5nIHtcbiAgcmV0dXJuIG5ldyBUZXh0U2VyaWFsaXplcih2b2lkTWFwKS5zZXJpYWxpemVDaGlsZHJlbihwYXJlbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZUhUTUwocGFyZW50OiBTaW1wbGVFbGVtZW50LCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gIGNsZWFyRWxlbWVudChwYXJlbnQpO1xuICBwYXJlbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKEluc2VydFBvc2l0aW9uLmFmdGVyYmVnaW4sIHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydEVsZW1lbnQobm9kZTogT3B0aW9uPFNpbXBsZU5vZGU+KTogU2ltcGxlRWxlbWVudCB7XG4gIGlmICghbm9kZSB8fCBub2RlLm5vZGVUeXBlICE9PSBOb2RlVHlwZS5FTEVNRU5UX05PREUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGVsZW1lbnQsIGdvdCAke25vZGV9YCk7XG4gIH1cblxuICByZXR1cm4gbm9kZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc0F0dHJpYnV0ZShwYXJlbnQ6IFNpbXBsZUVsZW1lbnQsIGF0dHI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBsZXQgYXR0cnMgPSBwYXJlbnQuYXR0cmlidXRlcztcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGF0dHJzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGF0dHJzW2ldLm5hbWUgPT09IGF0dHIpIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlyc3RFbGVtZW50Q2hpbGQocGFyZW50OiBTaW1wbGVFbGVtZW50KTogT3B0aW9uPFNpbXBsZUVsZW1lbnQ+IHtcbiAgbGV0IGN1cnJlbnQgPSBwYXJlbnQuZmlyc3RDaGlsZDtcblxuICB3aGlsZSAoY3VycmVudCkge1xuICAgIGlmIChjdXJyZW50Lm5vZGVUeXBlID09PSBOb2RlVHlwZS5FTEVNRU5UX05PREUpIHtcbiAgICAgIHJldHVybiBjdXJyZW50O1xuICAgIH1cbiAgICBjdXJyZW50ID0gY3VycmVudC5uZXh0U2libGluZztcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV4dEVsZW1lbnRTaWJsaW5nKG5vZGU6IFNpbXBsZU5vZGUpOiBPcHRpb248U2ltcGxlRWxlbWVudD4ge1xuICBsZXQgY3VycmVudCA9IG5vZGUubmV4dFNpYmxpbmc7XG5cbiAgd2hpbGUgKGN1cnJlbnQpIHtcbiAgICBpZiAoY3VycmVudC5ub2RlVHlwZSA9PT0gTm9kZVR5cGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgICByZXR1cm4gY3VycmVudDtcbiAgICB9XG4gICAgY3VycmVudCA9IGN1cnJlbnQubmV4dFNpYmxpbmc7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVsZW1lbnRJZChlbGVtZW50OiBTaW1wbGVFbGVtZW50KTogT3B0aW9uPHN0cmluZz4ge1xuICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG59XG5cbmNsYXNzIFRleHRTZXJpYWxpemVyIGV4dGVuZHMgU2VyaWFsaXplciB7XG4gIG9wZW5UYWcoX2VsZW1lbnQ6IFNlcmlhbGl6YWJsZUVsZW1lbnQpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBjbG9zZVRhZyhfZWxlbWVudDogU2VyaWFsaXphYmxlRWxlbWVudCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHRleHQodGV4dDogU2VyaWFsaXphYmxlTm9kZSkge1xuICAgIHJldHVybiB0ZXh0Lm5vZGVWYWx1ZSB8fCAnJztcbiAgfVxuXG4gIGNvbW1lbnQoX2NvbW1lbnQ6IFNlcmlhbGl6YWJsZU5vZGUpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICByYXdIVE1MU2VjdGlvbihfY29udGVudDogU2VyaWFsaXphYmxlTm9kZSk6IG5ldmVyIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgcmF3IEhUTUwgc2VjdGlvbiBpbiBzZXJpYWxpemVkIHRleHQnKTtcbiAgfVxufVxuIl19