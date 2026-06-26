import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import HomeCatalogGenreFilter from "@/components/home-catalog/HomeCatalogGenreFilter.vue";

describe("HomeCatalogGenreFilter", () => {
  it("shows the genre selector", () => {
    const wrapper = mount(HomeCatalogGenreFilter);

    expect(wrapper.find("select").exists()).toBe(true);
  });

  it("shows the genre options", () => {
    const wrapper = mount(HomeCatalogGenreFilter);
    const options = wrapper.findAll("option");

    expect(options).toHaveLength(20);
    expect(options[0].attributes("value")).toBe("");
    expect(options[1].attributes("value")).toBe("Action");
    expect(options[2].attributes("value")).toBe("Adventure");
  });

  it("selects all genres by default", () => {
    const wrapper = mount(HomeCatalogGenreFilter);
    const select = wrapper.find("select");

    expect(select.element.value).toBe("");
  });

  it("shows the selected genre received from v-model", () => {
    const wrapper = mount(HomeCatalogGenreFilter, {
      props: {
        modelValue: "Drama",
      },
    });
    const select = wrapper.find("select");

    expect(select.element.value).toBe("Drama");
  });

  it("sends the selected genre when the user changes it", async () => {
    const wrapper = mount(HomeCatalogGenreFilter);
    const select = wrapper.find("select");

    await select.setValue("Comedy");

    expect(wrapper.emitted("update:modelValue")).toEqual([["Comedy"]]);
  });
});
