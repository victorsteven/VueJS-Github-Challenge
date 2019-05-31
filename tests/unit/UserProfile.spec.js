import { shallowMount } from '@vue/test-utils';
import UserProfile from '../../src/components/UserProfile.vue';
import user from '../mockData';


describe('UserProfile', () => {
  let props;

  const util = () => {
    const wrapper = shallowMount(UserProfile, {
      propsData: props,
    });
    return {
      wrapper,
      avatar: () => wrapper.find('.panel_image_avatar'),
      name: () => wrapper.find('.panel_name'),
      bio: () => wrapper.find('.panel_bio'),
    };
  };

  beforeEach(() => {
    props = {
      user,
    };
  });

  it('renders the UserProfile component', () => {
    const { wrapper } = util();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders UserProfile Data components', () => {
    const { avatar, name, bio } = util();
    expect(avatar().exists()).toBe(true);
    expect(avatar().attributes().src).toBe(props.user.avatar_url);

    expect(name().exists()).toBe(true);
    expect(name().text()).toBe(props.user.name);

    expect(bio().exists()).toBe(true);
    expect(bio().text()).toBe(props.user.bio);
  });
});
