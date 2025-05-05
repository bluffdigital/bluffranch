import {defineType} from "sanity";

export const photo = defineType({
    name: 'photo',
    title: 'Photo',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            // eslint-disable-next-line
            validation: (Rule: { required: () => any; }) => Rule.required(),
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            // eslint-disable-next-line
            validation: (Rule: { required: () => any; }) => Rule.required(),
        },
        {
            name: 'googlePhotoUrl',
            title: 'Google Photo URL',
            type: 'url',
            description: 'Original URL from Google Photos',
        },
        {
            name: 'uploadedAt',
            title: 'Uploaded At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        },
    ],
});