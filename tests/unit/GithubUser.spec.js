
import { shallowMount } from '@vue/test-utils';
import GithubUser from '../../src/components/GithubUser.vue';
// import mockData from '../mockData';

describe('GithubUser', () => {
  it('renders the GithubUser component', () => {
    const wrapper = shallowMount(GithubUser);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
