<template>
    <v-app>
        <v-expand-x-transition>
            <div
                style="width:400px"
                v-if="show"
                class="card"  
                transition="slide-x-transition">
                    <v-container>
                        <div class="container-card" v-if="node.answer_type">
                            <h2>Ответ</h2>
                            <v-layout v-if="node.type === 'a'">
                                <v-flex
                                    xs12
                                    md6
                                >
                                    <h2>Ответ Бота:</h2>
                                </v-flex> 
                            </v-layout>
                            <v-layout v-if="node.answer_type">
                                <v-flex
                                    xs6
                                    md6
                                    style="display:flex; flex-direction: column;"
                                >   
                                    <label for="select">Вид ответа</label>
                                    <select
                                        name="select"
                                        v-model="node.answer_type"
                                        class="basic-select"
                                        >
                                        <option value="user">Пользовательский</option>
                                        <option value="tag">Тэг ответов</option>
                                    </select>
                                </v-flex> 
                            </v-layout>
                            <v-layout v-if="node.answer_type">
                                <v-flex
                                    xs12
                                    md12
                                    v-if="node.answer_type == 'user'"
                                >   
                                    <v-text-field
                                        small
                                        v-model="node.answer"
                                        label="Ответ"
                                        :disabled="node.type == 'b'"
                                        required
                                    ></v-text-field>
                                </v-flex> 
                                <v-flex
                                    xs12
                                    md12
                                    v-if="node.answer_type == 'tag'"
                                    style="display:flex; flex-direction: column; margin-top: 10px"
                                    >
                                    <select
                                        name="select"
                                        v-model="node.tag_id"
                                        class="basic-select"
                                        @change="node.tag = tags.find(x=>x.id == node.tag_id).name"
                                        >
                                        <option value="">Выберите тэг ответов</option>
                                        <option 
                                            v-for="tag in tags"
                                            :key="tag.id"
                                            :value="tag.id">{{tag.name}}</option>
                                    </select>
                                    <v-layout v-if="node.tag_id" style="margin-top: 10px">
                                        <v-flex
                                            xs12
                                            md12>
                                            <ul class="tags" v-if="tags.find(x=>x.id == node.tag_id)">
                                                <li 
                                                    v-for="(tag,index) in tags.find(x=>x.id == node.tag_id).values.slice(0, 7)"
                                                    :key="index">
                                                    <a href="#" class="tag">{{tag}}</a>
                                                </li>
                                                <li v-if="tags.find(x=>x.id == node.tag_id).values.length> 8">
                                                    <a href="#" class="tag">{{'+'+ (tags.find(x=>x.id == node.tag_id).values.length-8)}}</a>
                                                </li>
                                            </ul>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </div>
                        <div class="container-card">
                            <h2>Вопрос</h2>
                            <v-layout v-if="node.type !== 'a'">
                                <v-flex
                                xs12
                                md6
                                style="display:flex; flex-direction: column;"
                                >   
                                    <label for="select">Тип</label>
                                    <select
                                        name="select"
                                        v-model="node.type"
                                        class="basic-select"
                                        @change="changeType()"
                                        >
                                        <option 
                                            v-for="type in types"
                                            :key="type.value"
                                            :value="type.value">{{type.text}}</option>
                                    </select>
                                </v-flex>
                                <v-flex
                                xs12
                                md6
                                style="display:flex; flex-direction: column;"
                                >   
                                    <v-text-field
                                        small
                                        :disabled="node.type !== 'm'"
                                        v-model="answerCount"
                                        label="Количество"
                                        type="number"
                                        @change="answerCountChanged()"
                                        required
                                    ></v-text-field>
                                </v-flex>
                                
                            </v-layout>
                            <v-layout>
                                <v-flex
                                    xs12
                                    md6
                                >
                                    <v-text-field
                                        small
                                        v-model="node.value"
                                        label="Значение"
                                        required
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout v-if="node.type !== 'a'">
                                <v-flex
                                    xs12
                                    md12
                                    >
                                    <v-switch
                                        v-model="node.bot_can_answer"
                                        label="Авто ответ бота"
                                        @change="onBotAnswerChanged()"
                                        >
                                    </v-switch>
                                </v-flex>
                            </v-layout>
                            <v-layout 
                                v-if="node.type !== 'a' && node.bot_can_answer">
                                <v-flex
                                    xs12
                                    md12
                                    >
                                    <v-text-field
                                        small 
                                        label="Ответ бота"
                                        v-model="getBotAnswerNode().value"
                                        required
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </div>
                        
                    </v-container>
                    <v-card-actions>
                        <v-btn small @click="saveAndExit()" color="success">Сохранить</v-btn>
                        <v-btn small @click="downloadObjectAsJson(node, 'treeMap')"  color="primary">Экспорт</v-btn>
                        <v-btn small @click="closeCreator()" flat color="error">Закрыть</v-btn>
                    </v-card-actions>
            </div>
            </v-expand-x-transition>
    </v-app>
    
</template>

<script>
export default {
    name: 'nodeCreator',
    props: ["show"],
    data(){
        return{
            node: {
                id: '',
                value: '',
                type: 'e',
                answer_type: '',
                tag_id: '',
                tag: '',
                answer: 'asfas',
                bot_can_answer: false,
                bot_answer: '',
                children: [],
                expand: true
            },
            answerCount: 0,
            copyNode: '',
            types:[ 
                {
                    value: 'e',
                    text: 'end node'
                },
                {
                    value: 'b',
                    text: 'binary node'
                },
                {
                    value: 'm',
                    text: 'multiple choice node'
                },
                {
                    value: 'c',
                    text: 'continue node'
                }
            ],
            tags: [
                {
                    id: 1,
                    name: 'a',
                    values: ['a', 'aa', 'aaa', 'aaaaa', 'aaaaaa', 'a', 'aa', 'aaa', 'aaaaa', 'aaaaaa','a', 'aa', 'aaa', 'aaaaa', 'aaaaaa','a', 'aa', 'aaa', 'aaaaa', 'aaaaaa']
                },
                {
                    id: 2,
                    name: 'b',
                    values: ['b', 'bb', 'bbbb', 'bbb', 'bbbbbbbb']
                },
            ]
        }
    },
    methods:{
        initialize(node) {
            this.resetNodeValue()
            this.node = node
            this.answerCount = node.children ? node.children.length : 0
            this.copyNode = JSON.parse(JSON.stringify(this.node))
        },
        closeCreator() {
            this.resetNodeValue()
            this.$emit('close')
        },
        resetNodeValue() {
            if(!this.copyNode) return 
            this.node.id = this.copyNode.id
            this.node.answer_type = this.copyNode.answer_type
            this.node.tag = this.copyNode.tag
            this.node.tag_id = this.copyNode.tag_id 
            this.node.answer = this.copyNode.answer
            this.node.type = this.copyNode.type
            this.bot_can_answer =  this.copyNode.bot_can_answer
            this.node.children = this.copyNode.children
            this.node.value = this.copyNode.value
            this.node.expand = this.copyNode.expand
        },
        changeType() {
            console.log('type changed',this.node.type)
            if(this.node.type === 'e') {
                this.node.children = []
                this.answerCount = 0
            } else if(this.node.type === 'c') {
                this.node.children = [
                    {
                        id: '',
                        value: 'следующий вопрос',
                        type: 'e',
                        answer_type: '',
                        tag: '',
                        tag_id: '',
                        answer: '',
                        children: [],
                        bot_can_answer: false,
                        expand: true
                    }
                ]
                this.answerCount = 1
            } else if(this.node.type === 'b') {
                this.node.children = [
                    {
                        id: '',
                        value: 'следующий вопрос',
                        type: 'e',
                        answer_type: 'user',
                        tag: '',
                        tag_id: '',
                        answer: 'НЕТ',
                        children: [],
                        bot_can_answer: false,
                        expand: true
                    },
                    {
                        id: '',
                        value: 'следующий вопрос',
                        type: 'e',
                        answer_type: 'user',
                        tag: '',
                        tag_id: '',
                        answer: 'ДА',
                        bot_can_answer: false,
                        children: [],
                        expand: true
                    }
                ]
                this.answerCount = 2
            } else if(this.node.type === 'm') {
                this.node.children = []
                for(let i = 0; i < this.answerCount; i++){
                    this.node.children.push({
                        id: '',
                        value: `вопрос ${i+1}`,
                        type: 'e',
                        answer_type: 'user',
                        tag: '',
                        tag_id: '',
                        answer: `ответ ${i+1}`,
                        bot_can_answer: false,
                        children: [],
                        expand: true
                    })
                }
            }
        },
        answerCountChanged() {
            if(this.node.type === 'm') {
                if(this.node.children.length < this.answerCount) {
                    for(let i = this.node.children.length; i < this.answerCount; i++){
                        this.node.children.push({
                            id: '',
                            value: `вопрос ${i+1}`,
                            type: 'e',
                            answer_type: 'user',
                            tag: '',
                            tag_id: '',
                            answer: `ответ ${i+1}`,
                            bot_can_answer: false,
                            children: [],
                            expand: true
                        })
                    }
                } else {
                    this.node.children.splice(this.answerCount,  this.node.children.length - this.answerCount)
                }
            }
        },
        onBotAnswerChanged(){
            if(this.node.bot_can_answer){
                this.node.children.push({
                    id: '',
                    value: `ответ бота`,
                    type: 'a',
                    answer_type: '',
                    tag: '',
                    tag_id: '',
                    answer: '',
                    bot_can_answer: false,
                    children: [],
                    expand: true
                })
            } else {
                for (var i = this.node.children.length-1; i >=0 ; i--) {
                    var obj = this.node.children[i];
                    console.log('looking for delete ', obj)
                    if (obj.type === 'a') {
                        console.log("this.node.children.indexOf(obj.type) == 'a'")
                        this.node.children.splice(i, 1);
                        return
                    }
                }
            }
        },
        getBotAnswerNode(){
            for (var i = this.node.children.length-1; i >=0 ; i--) {
                var obj = this.node.children[i];
                console.log('looking in', obj)
                if (obj.type == 'a') {
                    return obj
                }
            }
            return ''
        },
        saveAndExit(){
            this.copyNode = ''
            this.$emit('close')
        },
        onAnswerTypeChanged(e){
            console.log(e, e ? 'user' : 'tag')
            if(e) {
                this.node.answer_type = 'tag'
                this.node.answer = ''
            } else {
                this.node.answer_type = 'user'
                this.node.tag_id = ''
                this.node.tag = ''
            }
        },

        downloadObjectAsJson(exportObj, exportName){
            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
            var downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href",     dataStr);
            downloadAnchorNode.setAttribute("download", exportName + ".json");
            document.body.appendChild(downloadAnchorNode); // required for firefox
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        } 
    }
}
</script>

<style>
.card{
    z-index: 10000;
    background: #fff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    text-align: center;
}
.theme--light.application{
    background: transparent !important
}
.basic-select{
    -webkit-appearance: menulist;
    background-color: #4caf50;
    color:  #fff;
    border-color: rgb(166, 166, 166);
}
.org-tree-node-label .org-tree-node-label-inner{
    word-wrap: break-word;
    max-width: 140px;
}


.tags {
  list-style: none;
  margin: 0;
  overflow: hidden; 
  padding: 0;
}

.tags li {
  float: left; 
}

.tag {
  background: #eee;
  border-radius: 3px 0 0 3px;
  color: #999;
  display: inline-block;
  height: 26px;
  line-height: 26px;
  padding: 0 20px 0 23px;
  position: relative;
  margin: 0 10px 10px 0;
  text-decoration: none;
  -webkit-transition: color 0.2s;
}

.tag::before {
  background: #fff;
  border-radius: 10px;
  box-shadow: inset 0 1px rgba(0, 0, 0, 0.25);
  content: '';
  height: 6px;
  left: 10px;
  position: absolute;
  width: 6px;
  top: 10px;
}

.tag::after {
  background: #fff;
  border-bottom: 13px solid transparent;
  border-left: 10px solid #eee;
  border-top: 13px solid transparent;
  content: '';
  position: absolute;
  right: 0;
  top: 0;
}

.tag:hover {
  background-color: crimson;
  color: white;
}

.tag:hover::after {
   border-left-color: crimson; 
}
.tag-hovered{
    background-color: crimson;
    color: white;
}
.tag-hovered::after {
   border-left-color: crimson; 
}

.container-card{
    /* background-color: #E0EDF4; */
    padding-left: 10px;
    margin-top: 10px;
    border-left: 5px solid #3EB3F6;
}
.bot-answer{
    border: 2px solid  #00e676; 
}

</style>
