function ellipsify(address, position, maxLength) {
    switch (position) {
        case 0:
            return '... ' + address.slice(-maxLength);
        case 1:
            return address.slice(0, maxLength-4) + ' ... ' + address.slice(-4);
        case 2:
            return address.slice(0, maxLength) + ' ...';
    }
}

export default ellipsify;