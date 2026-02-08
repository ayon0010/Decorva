// extensions/Indent.ts
"use client"
import { Extension } from '@tiptap/core'

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        indent: {
            indent: () => ReturnType
            outdent: () => ReturnType
        }
    }
}

export const Indent = Extension.create({
    name: 'indent',

    addOptions() {
        return {
            types: ['paragraph', 'heading'],
            indentSize: 24,
            maxLevel: 6,
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    indent: {
                        default: 0,
                        parseHTML: element =>
                            parseInt(element.style.marginLeft || '0', 10) /
                            this.options.indentSize || 0,
                        renderHTML: attributes => {
                            if (!attributes.indent) return {}
                            return {
                                style: `margin-left: ${attributes.indent * this.options.indentSize}px`,
                            }
                        },
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            indent:
                () =>
                    ({ state, commands }) => {
                        const { $from } = state.selection
                        const node = $from.node()

                        if (!this.options.types.includes(node.type.name)) {
                            return false
                        }

                        const current = node.attrs.indent || 0

                        return commands.updateAttributes(node.type.name, {
                            indent: Math.min(current + 1, this.options.maxLevel),
                        })
                    },

            outdent:
                () =>
                    ({ state, commands }) => {
                        const { $from } = state.selection
                        const node = $from.node()

                        if (!this.options.types.includes(node.type.name)) {
                            return false
                        }

                        const current = node.attrs.indent || 0

                        return commands.updateAttributes(node.type.name, {
                            indent: Math.max(current - 1, 0),
                        })
                    },
        }
    },
})
