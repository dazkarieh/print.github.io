+++
title= "hugo新增mermaid功能"
date= 2019-03-26T23:19:08+08:00
toc = true
type="post"
tags = ["hugo"]
categories = ["技术"]
mermaid = true
mathjax = false
slug = "support mermaid for hugo"
keywords = ["hugo","mermaid"]
+++
轻量级标记语言[Mermaid][l1] 是一个开源公共库，能够与markdown可无缝集成，帮助使用者直接将代码渲染成示意图、流程图、甘特图等，效果类似Markdown、ABCjs，你需要做的只是把代码写入mermaid简码区内，非常简明易懂。

基本示例如下：
<!--more-->
## 流程图（Flowchart）

{{< mermaid align="left" >}}
graph LR;
    A[Hard edge] -->|Link text| B(Round edge)
    B --> C{Decision}
    C -->|One| D[Result one]
    C -->|Two| E[Result two]
{{< /mermaid >}}


## 序列图（Sequence）

{{< mermaid >}}
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail...
    John-->Alice: Great!
    John->Bob: How about you?
    Bob-->John: Jolly good!
{{< /mermaid >}}

## 甘特图（Gantt）
### 甘特图示例1
{{<mermaid>}}
gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2014-01-12  , 12d
    another task      : 24d
{{< /mermaid >}}

### 甘特图示例2
{{<mermaid>}}
gantt
dateFormat  YYYY-MM-DD
title Adding GANTT diagram functionality to mermaid

section A section
Completed task            :done,    des1, 2014-01-06,2014-01-08
Active task               :active,  des2, 2014-01-09, 3d
Future task               :         des3, after des2, 5d
Future task2               :         des4, after des3, 5d

section Critical tasks
Completed task in the critical line :crit, done, 2014-01-06,24h
Implement parser and jison          :crit, done, after des1, 2d
Create tests for parser             :crit, active, 3d
Future task in critical line        :crit, 5d
Create tests for renderer           :2d
Add to mermaid                      :1d

section Documentation
Describe gantt syntax               :active, a1, after des1, 3d
Add gantt diagram to demo page      :after a1  , 20h
Add another diagram to demo page    :doc1, after a1  , 48h

section Last section
Describe gantt syntax               :after doc1, 3d
Add gantt diagram to demo page      : 20h
Add another diagram to demo page    : 48h
{{< /mermaid >}}

### 甘特图中文示例
{{<mermaid>}}
gantt
    title 项目开发流程
    section 项目确定
        需求分析       :a1, 2016-06-22, 3d
        可行性报告     :after a1, 5d
        概念验证       : 5d
    section 项目实施
        概要设计      :2016-07-05, 5d
        详细设计      :crit, 2016-07-08, 10d
        编码          :2016-07-15, 10d
        测试          :2016-07-22, 5d
    section 发布验收
        发布: 2d
        验收: 3d
{{< /mermaid >}}

### another sample
{{< mermaid >}}
gantt
    title 《婚姻法》相关法律法律、司法解释、通知时间轴
    dateFormat  YYYY-MM-DD

      section 1.《婚姻法》
       1980版《婚姻法》            : a1, 1981-01-01,2001-04-28
       1980版《婚姻法》第一次修订   : a2, 2001-04-28, 2019-03-27
    
       section 2.《婚姻法》解释
       解释（一）                  :active, b1, 2001-12-27, 2004-04-01
       解释（二）                  :active, b2, 2004-04-01, 2011-08-13
       解释（三）                  :active, b3, 2011-08-13, 2019-03-27
    
       section 3.夫妻债务法律法规
       《解释（二）的补充规定》      :crit, active, c1, 2017-02-28, 2019-03-28
       《关于依法妥善审理涉及夫妻债务案件有关问题的通知》   :crit,active, c2, 2017-02-28, 2019-03-27
       《关于审理涉及夫妻债务纠纷案件适用法律有关问题的解释》 :crit, active, c3, 2011-08-13, 2019-03-27
    
      section 4.未来如何
       让我们拭目以待            :crit,done,d1, 2019-03-27,2021-03-27

{{< /mermaid >}}


| 标记 | 简介 |
| :-:  | :-:  |
| title | 标题 |
| dateFormat | 日期格式 |
| section | 模块 |
| Completed | 已经完成 |
| Active | 当前正在进行 |
| Future | 后续待处理 |
| crit | 关键阶段 |
| 日期缺失 | 默认从上一项完成后 |

最开始是描述信息，定义图的类型，日期格式和标题。接下来，每个section就是一个项目。项目中，每一行就是一个任务。任务有名称和属性两部分组成，由英文冒号”:”分开。属性意义：

*   **done** 当前任务已经结束，如果没结束不用标记，必须为第一个。
*   **crit** 当前任务很重要，用红色高亮显示，可用于标记里程碑，必须为第一个。
*   **任务id** 必须全局唯一，可被后续任务引用，在状态后面（如果有状态描述）。此操作比较灵活，只需修改起始工作的时间，后置（**after**标记）任务时间全部会改变。如果没有后续依赖，也可省略任务id。
*   最后是任务时间，一般需要两个，开始和结束时间。可以是绝对时间或相对时间，非常灵活。

如果熟悉markdonw，对标记语言有一定了解，5分钟可以学会使用mermaid绘制gantt图管理项目。不过mermaid虽然敏捷，但是其gantt图还是有两个特性没有：

* 无法按百分比显示当前项目进度；
* 没有里程碑标记；

## 其他（other）
{{<mermaid>}}
graph TB
    c1-->a2
    subgraph one
    a1-->a2
    end
    subgraph two
    b1-->b2
    end
    subgraph three
    c1-->c2
    end
   {{< /mermaid >}}

在使用过程中发现mermaid唯一的不足是在小屏幕显示时，横坐标的数据会拥挤堆砌在一起。

[l1]: https://mermaidjs.github.io/
