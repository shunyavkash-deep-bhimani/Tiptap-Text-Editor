// import by npm or cdn
import Alpine from 'alpinejs'
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'

// text editor plugin
document.addEventListener('alpine:init', () => {
  Alpine.data('editor', (initialContent) => {
    let editor

    return {
      editorContent: initialContent,

      isLoaded() {
        return editor !== undefined && editor !== null
      },

      isActive(type, opts = {}) {
        return editor.isActive(type, opts)
      },

      toggleBold() {
        editor.chain().focus().toggleBold().run()
      },
      toggleItalic() {
        editor.chain().focus().toggleItalic().run()
      },
      toggleHeading(level) {
        editor.chain().focus().toggleHeading({ level: level }).run()
      },
      toggleBlockquote() {
        editor.chain().focus().toggleBlockquote().run()
      },
      toggleBulletList() {
        editor.chain().focus().toggleBulletList().run()
      },
      toggleOrderedList() {
        editor.chain().focus().toggleOrderedList().run()
      },
      toggleLink(attrs) {
        if (this.isLoaded()) {
          editor.chain().focus().toggleLink(attrs).run()
        }
      },

      setLink() {
        let el = document.querySelector('.editor .link-btn')
        if (!el.classList.contains('is-active')) {
          const url = prompt('Enter URL:')
          if (url !== null && url.trim() !== '') {
            editor
              .chain()
              .focus()
              .extendMarkRange('link')
              .setLink({ href: url })
              .run()
          }
        } else {
          editor.chain().focus().extendMarkRange('link').unsetLink().run()
        }
      },

      insertImage() {
        const url = prompt('Enter Image URL:')
        if (url !== null && url.trim() !== '') {
          editor.chain().focus().setImage({ src: url }).run()
        }
      },

      updatedAt: Date.now(),
      init() {
        editor = new Editor({
          element: this.$refs.editorReference,
          extensions: [
            StarterKit,
            Link.configure({
              openOnClick: false,
            }),
            Image,
          ],
          content: this.editorContent,

          onCreate: ({ editor }) => {
            this.updatedAt = Date.now()
          },

          onUpdate: ({ editor }) => {
            this.editorContent = editor.getHTML()
            this.updatedAt = Date.now()
          },

          onSelectionUpdate: ({ editor }) => {
            this.updatedAt = Date.now()
          },
        })
      },
    }
  })
})