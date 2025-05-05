import {type SchemaTypeDefinition} from 'sanity'
import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import {photo} from './objects/photo'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        settings,
        page,
        post,
        person,
        blockContent,
        infoSection,
        callToAction,
        link,
        photo
    ]
}