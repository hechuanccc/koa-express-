api: http://172.16.0.70/referral/retail/get/open/o2hwEwv7XKAtsX7oPOEHkMOXD9pg

res {"isOpen":false} ＝>true 能提现 付过费的同学才能提现哦


aip: http://172.16.0.70/referral/retail/set/open/o2hwEwv7XKAtsX7oPOEHkMOXD9pg

{"result":"OK"}  {"errors":["internal server error"]}

api: http://172.16.0.70/referral/retail/get/rate/o2hwEwv7XKAtsX7oPOEHkMOXD9pg/:degree

{"rate":0.2}

api: http://172.16.0.70/referral/retail/get/rates/o2hwEwv7XKAtsX7oPOEHkMOXD9pg

{"list":[{"degree":1,"rate":0.2}]}

api: http://172.16.0.70/referral/retail/set/rate/o2hwEwv7XKAtsX7oPOEHkMOXD9pg/1/.2

{"result":"OK"}

api: http://172.16.0.70/referral/retail/get/parent/o2hwEwv7XKAtsX7oPOEHkMOXD9pg

{"parent":openid}

api: http://172.16.0.70/referral/retail/get/children/o2hwEwv7XKAtsX7oPOEHkMOXD9pg/1

{"self":"o2hwEwv7XKAtsX7oPOEHkMOXD9pg","child":[{"self":"o2hwEwu7PWY0rK4I9hvG2Fgh4UjQ","child":[]},{"self":"o2hwEwpDyWaiw9-uFaLfn9gYZm6o","child":[]}]}

api: http://172.16.0.70/referral/retail/get/children-in-list/o2hwEwv7XKAtsX7oPOEHkMOXD9pg/1

{"degree_1":["o2hwEwu7PWY0rK4I9hvG2Fgh4UjQ","o2hwEwpDyWaiw9-uFaLfn9gYZm6o"],"openId":"o2hwEwv7XKAtsX7oPOEHkMOXD9pg"}


aip: http://172.16.0.70/referral/balance/get/amount/o2hwEwv7XKAtsX7oPOEHkMOXD9pg

{amount":0.0,"list":[]} =>amount 已经提过的总金额


api : http://172.16.0.2/registrar/api/user/new/o2hwEwmULnlG9z8JBuEy2auEqk9Y

=>{"city":"","headimgurl":"http://wx.qlogo.cn/mmopen/uchmtWQh7iaqrSUFBgo2eNvmwJ1Wbnnfvaicic9hr8kjcdYvwaHCDoWibkOQpLrNFdsPtcCniaXkq97rw6ysKIaasBc4DZJB1J7a9/0","subscribe":1,"country":"爱尔兰","openid":"o2hwEwmULnlG9z8JBuEy2auEqk9Y","sex":1,"language":"zh_CN","remark":"","tagid_list":[],"province":"利特里姆","subscribe_time":1466765984,"groupid":0,"nickname":"何大牙"}


api : http://172.16.0.70/referral/balance/get/amount-left/o2hwEwv7XKAtsX7oPOEHkMOXD9pg

=>{"openId":"o2hwEwv7XKAtsX7oPOEHkMOXD9pg","left":0.0,"total":0.0,"amount":0.0,"payTotal":0.0,"list":[{"rate":0.15,"degree":1,"total":0.0,"openIds":["o2hwEwu7PWY0rK4I9hvG2Fgh4UjQ","o2hwEwpDyWaiw9-uFaLfn9gYZm6o"],"payTotal":0.0}]}

api: http://service/referral/retail/get/ticket/o2hwEwmULnlG9z8JBuEy2auEqk9Y

=>{"status":0,"ticket":"gQF27zoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL1JqbWJkem5tWjRNZTFLdWlyQkVlAAIEaTrhVwMEAAAAAA=="}

api: https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=TICKET


api service/referral/user/send/template open_id msg,url


