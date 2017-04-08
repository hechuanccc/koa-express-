module.exports = {
    index: function*(){        
      if (!this.openMsg.isOpen) {
        this.body = '404 Not Found'
      }else {
        this.body = yield this.render('index',this.data)
      }
    },
    upload: function*(){
      console.log('this.path' + this.path)
      this.body = yield this.render('upload',{})
    },
    message: function*(){
      if (!this.openMsg.isOpen) {
        this.body = '404 Not Found'
      }else {
        this.body = yield this.render('message',this.data)
      }
    }

}

