import { shallowMount } from '@vue/test-utils';
import UserSearch from '../../src/components/UserSearch.vue';

describe('UserSearch', () => {
  const util = () => {
    const wrapper = shallowMount(UserSearch);

    return {
      wrapper,
      input: () => wrapper.find('input'),
      button: () => wrapper.find('button'),
    };
  };

  it('renders the UserSearch component', () => {
    const { wrapper } = util();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Assert that we have an input field and a search button', () => {
    const { input, button } = util();

    expect(input().exists()).toBe(true);
    expect(button().exists()).toBe(true);
  });

  it('calls "submitted" event when submitting form', () => {
    // arrange
    const expectedUser = 'victorsteven';
    const { wrapper, button, input } = util();
    input().element.value = expectedUser;

    input().trigger('input');
    button().trigger('click');
    button().trigger('submit');

    expect(wrapper.emitted().submitted[0]).toEqual([expectedUser]);
  });
});
