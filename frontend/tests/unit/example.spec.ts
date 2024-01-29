import { mount } from "@vue/test-utils";
import HelloWelcome from "../../src/components/HelloWelcome.vue";

describe("Hello", () => {
  it("check if prop msg match", () => {
    const msg = "I'm a example component with composition API";
    const wrapper = mount(HelloWelcome, { props: { msg } });
    expect(wrapper.text()).toMatch(msg);
  });
});
