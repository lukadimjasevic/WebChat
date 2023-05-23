exports.rand = () => {
    return Math.random().toString(36).substring(2);
};

exports.createToken = () => {
    return this.rand() + this.rand() + this.rand() + this.rand();
};

exports.groupCode = () => {
    return this.rand();
}