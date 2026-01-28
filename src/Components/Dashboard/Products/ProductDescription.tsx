"use client";
import React from "react";
import { useEditor, EditorContent, Editor, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import { AlignCenter, AlignLeft, AlignRight, Italic, List, ListOrdered, Quote, Strikethrough } from "lucide-react";


const MenuBar = ({ editor }: { editor: Editor | null }) => {
    const editorState = useEditorState({
        editor,
        selector: ctx => {
            return {
                isBold: ctx?.editor?.isActive('bold') ?? false,
                canBold: ctx?.editor?.can().chain().toggleBold().run() ?? false,
                isItalic: ctx?.editor?.isActive('italic') ?? false,
                canItalic: ctx?.editor?.can().chain().toggleItalic().run() ?? false,
                isStrike: ctx?.editor?.isActive('strike') ?? false,
                canStrike: ctx?.editor?.can().chain().toggleStrike().run() ?? false,
                isCode: ctx?.editor?.isActive('code') ?? false,
                canCode: ctx?.editor?.can().chain().toggleCode().run() ?? false,
                canClearMarks: ctx?.editor?.can().chain().unsetAllMarks().run() ?? false,
                isParagraph: ctx?.editor?.isActive('paragraph') ?? false,
                isHeading1: ctx?.editor?.isActive('heading', { level: 1 }) ?? false,
                isHeading2: ctx?.editor?.isActive('heading', { level: 2 }) ?? false,
                isHeading3: ctx?.editor?.isActive('heading', { level: 3 }) ?? false,
                isHeading4: ctx?.editor?.isActive('heading', { level: 4 }) ?? false,
                isHeading5: ctx?.editor?.isActive('heading', { level: 5 }) ?? false,
                isHeading6: ctx?.editor?.isActive('heading', { level: 6 }) ?? false,
                isBulletList: ctx?.editor?.isActive('bulletList') ?? false,
                isOrderedList: ctx?.editor?.isActive('orderedList') ?? false,
                isCodeBlock: ctx?.editor?.isActive('codeBlock') ?? false,
                isBlockquote: ctx?.editor?.isActive('blockquote') ?? false,
                isAlignLeft: ctx?.editor?.isActive({ textAlign: 'left' }) ?? false,
                isAlignCenter: ctx?.editor?.isActive({ textAlign: 'center' }) ?? false,
                isAlignRight: ctx?.editor?.isActive({ textAlign: 'right' }) ?? false,
                canUndo: ctx?.editor?.can().chain().undo().run() ?? false,
                canRedo: ctx?.editor?.can().chain().redo().run() ?? false,
            }
        },
    })

    return (
        <div className="control-group">
            <div className="button-group flex gap-2 flex-wrap px-3">
                <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    disabled={!editorState?.canBold}
                    className={`${editorState?.isBold ? 'is-active' : 'text-black/50'} font-bold cursor-pointer border-2 hover:border-primary border-white w-8 h-8 flex items-center justify-center rounded-sm transition-all duration-300 delay-150`}
                >
                    B
                </button>
                <button
                    title="Italic"
                    type="button"
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    disabled={!editorState?.canItalic}
                    className={`${editorState?.isItalic ? 'is-active' : 'text-black/50'} cursor-pointer border-2 hover:border-primary border-white w-8 h-8 flex items-center justify-center rounded-sm transition-all duration-300 delay-150`}
                >
                    <Italic className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    title="Strikethrough"
                    onClick={() => editor?.chain().focus().toggleStrike().run()}
                    disabled={!editorState?.canStrike}
                    className={`${editorState?.isStrike ? 'is-active' : 'text-black/50'} cursor-pointer border-2 hover:border-primary border-white w-8 h-8 flex items-center justify-center rounded-sm transition-all duration-300 delay-150`}
                >
                    <Strikethrough className="w-4 h-4" />
                </button>
                <button
                    title="Bullet list"
                    type="button"
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                    className={`${editorState?.isBulletList ? 'is-active' : 'text-black/50'} cursor-pointer border-2 hover:border-primary border-white w-8 h-8 flex items-center justify-center rounded-sm transition-all duration-300 delay-150`}
                >
                    <List className="w-4 h-4" />
                </button>
                <button
                    title="Number list"
                    type="button"
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                    className={`${editorState?.isOrderedList ? 'is-active' : 'text-black/50'} cursor-pointer border-2 hover:border-primary border-white w-8 h-8 flex items-center justify-center rounded-sm transition-all duration-300 delay-150`}
                >
                    <ListOrdered className="w-4 h-4" />
                </button>
                <button
                    title="Blockquote"
                    type="button"
                    onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                    className={`${editorState?.isBlockquote ? 'is-active' : 'text-black/50'} cursor-pointer border-2 hover:border-primary border-white w-8 h-8 flex items-center justify-center rounded-sm transition-all duration-300 delay-150`}
                >
                    <Quote className="w-4 h-4" fill="#000000" />
                </button>
                <button
                    title="Align left"
                    type="button"
                    onClick={() => editor?.chain().focus().setTextAlign('left').run()}
                    className={`${editorState?.isAlignLeft ? 'is-active' : 'text-black/50'} cursor-pointer border-2 hover:border-primary border-white w-8 h-8 flex items-center justify-center rounded-sm transition-all duration-300 delay-150`}
                >
                    <AlignLeft className="w-4 h-4" />
                </button>
                <button
                    title="Align center"
                    type="button"
                    onClick={() => editor?.chain().focus().setTextAlign('center').run()}
                    className={`${editorState?.isAlignCenter ? 'is-active' : 'text-black/50'} cursor-pointer border-2 hover:border-primary border-white w-8 h-8 flex items-center justify-center rounded-sm transition-all duration-300 delay-150`}
                >
                    <AlignCenter className="w-4 h-4" />
                </button>
                <button
                    title="Align right"
                    type="button"
                    onClick={() => editor?.chain().focus().setTextAlign('right').run()}
                    className={`${editorState?.isAlignRight ? 'is-active' : 'text-black/50'} cursor-pointer border-2 hover:border-primary border-white w-8 h-8 flex items-center justify-center rounded-sm transition-all duration-300 delay-150`}
                >
                    <AlignRight className="w-4 h-4" />
                </button>
        
                {/* <button
                    onClick={() => editor?.chain().focus().toggleCode().run()}
                    disabled={!editorState?.canCode}
                    className={editorState?.isCode ? 'is-active' : ''}
                >
                    Code
                </button>
                <button onClick={() => editor?.chain().focus().unsetAllMarks().run()}>Clear marks</button>
                <button onClick={() => editor?.chain().focus().clearNodes().run()}>Clear nodes</button>
                <button
                    onClick={() => editor?.chain().focus().setParagraph().run()}
                    className={editorState?.isParagraph ? 'is-active' : ''}
                >
                    Paragraph
                </button>
                <button
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editorState?.isHeading1 ? 'is-active' : ''}
                >
                    H1
                </button>
                <button
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editorState?.isHeading2 ? 'is-active' : ''}
                >
                    H2
                </button>
                <button
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editorState?.isHeading3 ? 'is-active' : ''}
                >
                    H3
                </button>
                <button
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 4 }).run()}
                    className={editorState?.isHeading4 ? 'is-active' : ''}
                >
                    H4
                </button>
                <button
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 5 }).run()}
                    className={editorState?.isHeading5 ? 'is-active' : ''}
                >
                    H5
                </button>
                <button
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 6 }).run()}
                    className={editorState?.isHeading6 ? 'is-active' : ''}
                >
                    H6
                </button>

                <button
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                    className={editorState?.isOrderedList ? 'is-active' : ''}
                >
                    Ordered list
                </button>
                <button
                    onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
                    className={editorState?.isCodeBlock ? 'is-active' : ''}
                >
                    Code block
                </button>
                
                <button onClick={() => editor?.chain().focus().setHorizontalRule().run()}>Horizontal rule</button>
                <button onClick={() => editor?.chain().focus().setHardBreak().run()}>Hard break</button>
                <button onClick={() => editor?.chain().focus().undo().run()} disabled={!editorState?.canUndo}>
                    Undo
                </button>
                <button onClick={() => editor?.chain().focus().redo().run()} disabled={!editorState?.canRedo}>
                    Redo
                </button> */}
            </div>
        </div>
    )
}



const ProductDescription = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: '',
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: "p-3 h-[400px] focus:outline-none"
            }
        }
    })
    return (
        <div className="bg-white flex flex-col gap-2 border border-black/30">
            <div className="text-base border-b border-b-black/30 p-3">
                Product Description
            </div>
            <MenuBar editor={editor} />
            <div className="">
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default ProductDescription;