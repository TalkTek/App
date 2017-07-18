# 介紹
知識膠囊的頁面

# 函數
## audioPlayingTimerStart
###變數
```
formated: 用來顯示正確格式的時間 ex: 00:48
secTime: 以秒為顯示單位，這是為了PlayingAudioScreen頁面準備的變數，為了Slider使用
outdatedValue, nowValue: 主要是因為react-native-audio-toolkit的bug，其bug為
在第一次按下暫停的時候，由此package產生的instance給的currentTime這個屬性值，會自動
減2000ms，所以會造成在時間的顯示或者Slider上面的錯誤，而且這情形只會發生一次。
```
