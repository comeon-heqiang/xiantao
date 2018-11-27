module.exports = {
  // 失败返回信息
  err(err) {
    return {
      code: 500,
      message: err
    }
  },
//   成功返回信息
  success(suc) {
    return {
      code: 200,
      message: suc
    }
  }
}
