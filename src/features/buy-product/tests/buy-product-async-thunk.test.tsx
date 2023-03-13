import { fetchCurrentProduct } from "../slice/slice";

global.fetch = jest.fn();

describe("Current product", () => {
  test("Fetch current product with resolved response", async () => {
    // eslint-disable-next-line max-len
    const data = {
      id: 0,
      preview: "http://qa-games.ru/astore/public/images/15932051.jpeg",
      images: [
        "http://qa-games.ru/astore/public/images/15932051.jpeg",
        "http://qa-games.ru/astore/public/images/15586005.jpeg",
        "http://qa-games.ru/astore/public/images/45862782.jpeg",
        "http://qa-games.ru/astore/public/images/75259815.jpeg",
      ],
      title: "Рюкзак «Для умных и свободных»",
      description:
        // eslint-disable-next-line max-len
        "Поместится и ноутбук, и худи. У рюкзака широкие красные лямки и светоотражающие элементы — вас заметят и днём, и ночью.",
      price: 4999,
      availability: true,
    };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(data),
    });

    const dispatch = jest.fn();
    const thunk = fetchCurrentProduct("0");

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await thunk(dispatch, () => {}, "groups/fetchData");

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [pending, fullfiled] = calls;

    expect(pending[0].type).toBe(fetchCurrentProduct.pending.type);
    expect(fullfiled[0].type).toBe(fetchCurrentProduct.fulfilled.type);
    expect(fullfiled[0].payload).toBe(data);
  });

  test("Fetch current product with rejected response", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      statusText: "Продукт не найден",
    });

    const dispatch = jest.fn();
    const thunk = fetchCurrentProduct("0");

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await thunk(dispatch, () => {}, "products/fetchData");

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [pending, rejected] = calls;
    expect(pending[0].type).toBe(fetchCurrentProduct.pending.type);
    expect(rejected[0].type).toBe(fetchCurrentProduct.rejected.type);
    expect(rejected[0].error.message).toBe("Продукт не найден");
  });
});
