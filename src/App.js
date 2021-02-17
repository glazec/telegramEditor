import { Button, Container, Grid, Divider, Modal, Form } from 'semantic-ui-react'
import React from "react";

import EditorJs from "react-editor-js";
import DateTimePicker from 'react-datetime-picker';
import { EDITOR_JS_TOOLS } from "./constants";
const edjsHTML = require("editorjs-html");
const axios = require("axios").default;
const showdown = require("showdown");

const edjsParser = edjsHTML();
const converter = new showdown.Converter();

function App() {
  const instanceRef = React.useRef(null);
  const [open, setOpen] = React.useState(false)
  const [time, setTime] = React.useState(new Date());
  const [chatId, setChatId] = React.useState('');
  // const [botToken, setBotToken] = React.useState(null);

  function handleChange(e, { arg, value }) {
    let formKey = arg || {};
    switch (formKey) {
      // case "botToken":
      //   setBotToken(value);
      //   break;
      case "chatId":
        setChatId(value);
        break;
      default:
        break;
    }

  }
  async function triggerIntergromat(
    schedule = "5",
    content = "_markdownItalic_",
    recipient = "828090678"
  ) {
    recipient = recipient != null ? recipient : "828090678";
    console.info(schedule)
    console.info(content)
    console.info(recipient)

    // const response = await axios.post("https://hook.integromat.com/zkhcf32uoy3pthg522f2imwiits0l5uk", {
    //   schedule: schedule,
    //   content: content,
    //   recipient: recipient,
    // });
  }

  async function publish() {
    const savedData = await instanceRef.current.save();

    // console.log(JSON.stringify(savedData));
    var html = edjsParser.parse(savedData);
    html = html.join("");
    // var md = converter.makeMarkdown(html);
    // md = md.split("<").join("").split(">").join("");

    html = html.split("<p> ").join("");
    console.info(html)
    html = html.split("</p>").join('\n\n');
    // BOT.sendMessage(828090678, md, { parse_mode: "Markdown" });
    let scheduleSeconds = Math.abs(time - Date.now()) / 1000
    await triggerIntergromat(scheduleSeconds, html, chatId);
  }
  return (
    <Container style={{ marginTop: "16px" }}>
      <navbar>
        <Grid columns='equal'>
          <Grid.Column floated="left" width={2}>

          </Grid.Column>
          <Grid.Column floated="right" width={1}>
            <Modal
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              trigger={<Button primary>Publish</Button>}
            >
              <Modal.Header>Schedule your post</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <Form>
                    {/* <Form.Field>
                      <label>Bot Token</label>
                      <input placeholder="828090678" name="botToken" value={botToken} onChange={this.handleChange}></input>
                    </Form.Field> */}
                    <Form.Field>
                      <label>Chat ID</label>
                      <input placeholder="828090678" name="chatId" value={chatId} onChange={handleChange}></input>
                    </Form.Field>
                  </Form>

                  <Divider hidden></Divider>
                  <DateTimePicker
                    onChange={setTime}
                    value={time}
                  />
                  <Divider hidden></Divider>
                  <i>Use Numpad to enter the time</i>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                  Back
        </Button>
                <Button
                  content="Publish"
                  labelPosition='right'
                  icon='checkmark'
                  onClick={() => {
                    publish().then(() => {
                      setOpen(false);
                    })
                  }}
                  positive
                />
              </Modal.Actions>
            </Modal>
          </Grid.Column>
        </Grid>
      </navbar>
      <Divider hidden />
      <EditorJs
        instanceRef={(instance) => (instanceRef.current = instance)}
        tools={EDITOR_JS_TOOLS}
        i18n={{
          messages: {},
        }}
        data={{
          "time": 1613541398144,
          "blocks": [{ "type": "paragraph", "data": { "text": "#years" } }, { "type": "paragraph", "data": { "text": "🎉 自留地新年活动第二弹：用镜头记录春节" } }, { "type": "paragraph", "data": { "text": "🏮 新年的脚步近了，大街小巷卖春联的摊位多了起来。在这个传统节日里，很多朋友得以结束一年忙碌的工作，腾出时间留给自己、家人、朋友。希望大家都能够放慢脚步，用心生活" } }, { "type": "paragraph", "data": { "text": "📷 很喜欢 <a href=\"https://twitter.com/xavierwang3p/status/1357911600863191040?s=21\">主编</a> 近日的街拍，在他的镜头下，年俗活动和车水马龙的城市相互交融，代入感很强。美好的瞬间记录只需一瞬，流转的光影回味令人难忘。因此，自留地第二弹活动将围绕「新年」展开，邀请大家拿起镜头，记录自己的春节生活" } }, { "type": "paragraph", "data": { "text": "🕒 时间：即刻起 - 2 月 18 日 20:00" } }, { "type": "paragraph", "data": { "text": "👨 参与方式：" } }, { "type": "paragraph", "data": { "text": "在本条推送下，晒出一张或多张原创照片，展示自己的春节生活，即可参与抽奖。可以是新年街拍，也不限于美食分享、旅游见闻等角度" } }, { "type": "paragraph", "data": { "text": "抽奖使用脚本开奖，抽奖过程公平、公正、公开" } }, { "type": "paragraph", "data": { "text": "👀 具体要求：" } }, { "type": "paragraph", "data": { "text": "① 照片需为个人原创，体现「春节生活」主题即可，并展示向上的生活态度" } }, { "type": "paragraph", "data": { "text": "② 请用文字补充拍摄器材具体型号（必须，包括但不限于手机和相机）" } }, { "type": "paragraph", "data": { "text": "③ 请用几句话简单描述一下照片内容（必须）" } }, { "type": "paragraph", "data": { "text": "④ 拍摄理由和感受分享（可选）" } }, { "type": "paragraph", "data": { "text": "期待大家能够记录春节生活点滴，与我们分享。照片不分高低，只求雅俗共赏。我们也会进行筛选，剔除不符合以上要求 / 涉及盗图、敷衍行为的评论" } }, { "type": "paragraph", "data": { "text": "🎁 奖品（共 31 份）：" } }, { "type": "paragraph", "data": { "text": "• <a href=\"https://t.me/NewlearnerChannel/6091\">Flomo</a> 1 年 Pro 订阅 x3" } }, { "type": "paragraph", "data": { "text": "• <a href=\"https://store.lizhi.io/site/products/id/280?cid=fozh9ql2\">Downie</a> 4 x2 by 数码荔枝" } }, { "type": "paragraph", "data": { "text": "😉 本次抽奖围绕频道介绍过的优质 App，邀请开发者为我们提供奖品。感谢独立开发者们对自留地的肯定和支持，以及正版软件平台 <a href=\"https://store.lizhi.io/site/search_list?order_by=2&amp;category_id=57&amp;cid=fozh9ql2\">数码荔枝</a> 对本次活动的赞助" } }, { "type": "paragraph", "data": { "text": "在新的一年中，自留地依然会聚焦于实用软件体验与分享，希望能够遇到更多优秀的独立开发者和他们的作品。欢迎大家 <a href=\"https://t.me/newlearner_pm_bot\">来稿</a> 自荐！" } }, { "type": "paragraph", "data": { "text": "🎆 最后，也不要忘记参与自留地新年活动第一弹：我和 <a href=\"https://t.me/NewlearnerChannel/6543\">Android</a>" } }, { "type": "paragraph", "data": { "text": "* 本活动一切解释权归自留地和赞助方所有，若奖品有剩余，则给予编辑部 / 优秀来稿者" } }, { "type": "paragraph", "data": { "text": "频道：@NewlearnerChannel" } }], "version": "2.19.1"
        }
        }
      />
    </Container>
  );
}

export default App;
