<template>
  <div
    contenteditable="true"
    class="main-textarea"
    ref="edittable"
    v-once
    @keyup.mention="keyupMention()"
    @keyup.esc="closeMentionPanel()"
    @keydown="handleKeyDown"
    @input="update"
  ></div>
</template>
<script>
import {
  closest,
  getOffset,
  getPrecedingRange,
  getRange,
  applyRange
} from "@/utils/mention";
export default {
  props: {
    content: {
      type: String,
      function() {
        return "";
      }
    },
    mention: {
      type: Object,
      function() {
        return {
          show: false,
          rectX: null,
          rectY: null
        };
      }
    }
  },
  mounted() {
    // let p = document.getElementsByClassName('main-textarea')[0]
    // let s = window.getSelection()
    // let r = document.createRange()
    // r.setStart(p, p.childElementCount)
    // r.setEnd(p, p.childElementCount)
    // s.removeAllRanges()
    // s.addRange(r)
    this.$refs.edittable.focus();
  },
  watch: {
    content: function(newValue) {
      if (newValue == "") {
        this.$el.innerHTML = "";
      }
      if (document.activeElement == this.$el) {
        return;
      }
      this.$el.innerHTML = newValue;
    }
  },
  methods: {
    update: function(event) {
      this.$emit("update", event.target.innerHTML);
    },
    setFocus() {
      this.$refs.edittable.focus();
    },
    keyupMention() {
      let range = getPrecedingRange();
      // console.log(range)
      // if(range.endOffset >= 1) {
      //   let a = range.endContainer.childNodes[range.endOffset]
      //       || range.endContainer.childNodes[range.endOffset - 1]
      //       console.log(range.endContainer.childNodes)
      // }
      const rect = range.getClientRects()[0]
      this.$emit('mentionPanel', {
        show: true,
        rectX: rect.left,
        rectY: rect.top
      })
      if (range.endOffset >= 1) {
        let a =
          range.endContainer.childNodes[range.endOffset] ||
          range.endContainer.childNodes[range.endOffset - 1];
        // if (!a || a.nodeType === Node.TEXT_NODE && !/^\s?$/.test(a.data)) {
        //     return
        //   } else if (a.nodeType === Node.TEXT_NODE) {
        //     if (a.previousSibling) a = a.previousSibling
        //   } else {
        //     if (a.previousElementSibling) a = a.previousElementSibling
        //   }
        console.log(range);
      }
    },
    closeMentionPanel() {
      return this.$emit("mentionPanel", {
        show: false,
        rectX: null,
        rectY: null
      });
    },
    handleKeyDown(e) {
      if (e.keyCode === 38 || e.keyCode === 40) {
        // ↑/↓
        if (!(e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          e.stopPropagation();
          // this.selectByKeyboard(e)
        }
        return;
      }
      if (e.keyCode === 13 || (this.tabSelect && e.keyCode === 9)) {
        // enter or tab
        // this.insertItem()
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      if (e.keyCode === 27) {
        // esc
        this.closeMentionPanel();
        return;
      }
      // 为了兼容ie ie9~11 editable无input事件 只能靠keydown触发 textarea正常
      // 另 ie9 textarea的delete不触发input
      const isValid = (e.keyCode >= 48 && e.keyCode <= 90) || e.keyCode === 8;
      if (isValid) {
        // setTimeout(() => {
        //   this.handleInput()
        console.log("i");
        // }, 50)
      }
      if (e.keyCode === 8) {
        this.closeMentionPanel();
        console.log("h");
      }
    },
    handleInput(keep) {}
  }
};
</script>
