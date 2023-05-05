---
outline: deep
---

# Create lottery-turntable without third-party

## Background
The big turntable is a kind of marketing activity, used to increase users' stickiness.

With the development of the times, sweepstakes have sprung up like mushrooms after rain. However,  the turntable is always the most classic one. 

This article will explains how to make a big turntable with the native ability of React and CSS. 

## How to make it rotating
There are millions of ways to make an HTML element rotate, In this case, we are going to use some native CSS abilities.

`transform` is the right property to rotate something.

`transition` is used to simulate acceleration and deceleration.

For example:
```tsx
const ele = document.getElementById('turntable') as HTMLElement
ele.style.transition = 'all 6500ms'
ele.style.transform = `rotate(${rotateDeg}deg)` 
```

## Calculate the degree of rotation
Before we use `transform` to rotate anything, the degree of rotation shall be calculated so that the turnable will stop at the right place.

### The first rotation
Suppose the turntable has six petals with 60 degree in each.

<!-- <img src="../deg.svg" width = "300" alt="图片名称" align-items=“center” /> -->

If the turntable starts from `petal one`, and we want it stops at `petal two`. We need to give it 300 degrees.

```tsx
ele.style.transform = `rotate(${300}deg)` 
```

The formula is easy:

<img src="../firstrotate.svg" width = "300" alt="图片名称" align-items=“center” />

### 第二次转动
![无标题-2023-01-11-1446.svg](https://cdn.nlark.com/yuque/0/2023/svg/25790591/1673421476669-ff4c3058-3ff0-4b87-b504-19538f901b13.svg#clientId=ua332647a-7b8f-4&from=drop&height=280&id=oL1Nz&originHeight=1182&originWidth=1029&originalType=binary&ratio=1&rotation=0&showTitle=false&size=14313&status=done&style=none&taskId=u18b7531c-c65d-4594-9a92-a49a6bc03b8&title=&width=244)
第一次转动结束后转盘停在2号区域，转盘的 **transform: rotate(300deg)**。假设新的中奖区域在3号区域，此时该转动多少度？

#### 计算方式一
从2到3，也需要**转300度**。因为第一次已经转了300度，所以赋值 **transform: rotate(600deg)**。这个计算方式**既要记录上一次转过的角度，也要计算两者相差的角度。**

#### 计算方式二
因为 transform: rotate(deg) 代表与初始位置的偏差。如果停留在3，那么这个值必然是240加上360的倍数。这个计算方式**只要记录上一次转过的角度**。

公式更新：
![](https://cdn.nlark.com/yuque/__latex/ef46c4437e2f5fecb77e9c47c31b0b4c.svg#card=math&code=%0ArotateDeg%20%3D%0A%5Cbegin%7Bcases%7D%0A360%20-%2060%2A%28NumOfArea-1%29%2C%20%20%26%20%5Ctext%7Bif%20%24n%24%20%3D%201%7D%20%5C%5C%0A360%20-%2060%2A%28NumOfArea-1%29%20%2B%20360%2AZ%20%26%20%5Ctext%7Bif%20%24n%24%20%3E%201%7D%0A%5Cend%7Bcases%7D&id=LAGfb)
Z 代表整数，为保证角度大于上一次角度的最小整数
## 代码
归纳上面的内容，我们将大转盘做成一个组件。代码如下：
```tsx
const LuckyDraw = () => {
  // 这是react的state管理方式
  const [startRotateDeg, setStartRotateDeg] = useState(0)

  function getTargetDegree() {
    // 随机获取中奖区域
    const prizeIndex = Math.floor(Math.random() * 6)
    // 判断中奖与否
    const blankPrize = LuckyDrawConstant.prizeList[prizeIndex].blankPrize
    // 奖品名
    const name = LuckyDrawConstant.prizeList[prizeIndex].name
    // 计算角度（标号从0到5）
    const targetDegree = 360 - 60 * (prizeIndex - 0)

    return { blankPrize, name, targetDegree }
  }

  function handleClick() {
    // 获取目标角度
    const response = getTargetDegree()
    if (response?.targetDegree !== undefined) {
      let rotateDeg = response?.targetDegree
      // 和上次记录的角度作比较，只要小于它，就不断加上360
      while (rotateDeg <= startRotateDeg) {
        rotateDeg = rotateDeg + 360
      }
      // 获取转盘实例
      const ele = document.getElementById('turntable') as HTMLElement
      // 增加旋转动画
      ele.style.transition = 'all 6500ms'
      // 乘以10是为了转盘转动的效果
      ele.style.transform = `rotate(${rotateDeg + 360 * 10}deg)`
      // 记录上一次旋转到的角度
      setStartRotateDeg(rotateDeg + 360 * 10)
    }
  }

  return (
    <div>
      <div id='turntable'>
        // 大转盘元素
        ....
      </div>
      <button onClick={()=>{handleClick()}}></button>
    </div>
  )
}

export default LuckyDraw

```

为了满足业务需求还可以加上复杂的样式和图片。
