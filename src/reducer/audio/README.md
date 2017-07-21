## Audio Module 功能說明

### cpAudioIsGood
capsulesId

userId  

parentKey   
```
依照上述參數，至 firebase 對 user -> favorite 進行項目添加，並對膠囊 likeCounter 進行累加，回傳 like 數量
```

### cpAudioIsNotGood
capsulesId

userId  

parentKey   
```
依照上述參數，至 firebase 對 user -> favorite 進行項目刪除，並對膠囊 likeCounter 進行減 1，回傳 like 數量
```