import toast from '../index';

// README
export { default as README } from '../README.md';

// chapter title
export const chapter = 'ct-toast';

// case
export const cases = {
    'ct-toast': function() {
        return {
            template: `
            <button @click="handleClick">click me</button>
            `,
            methods: {
                handleClick() {
                    toast.show('this is a toast');
                }
            }
        };
    }
};
