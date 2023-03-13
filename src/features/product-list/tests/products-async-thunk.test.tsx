import { fetchProducts } from "../slice/slice";

global.fetch = jest.fn();

describe("Products thunk", () => {
  test("Fetch products with resolved response", async () => {
    // eslint-disable-next-line max-len
    const data = [
      {
        availability: true,
        description:
          // eslint-disable-next-line max-len
          "Поместится и ноутбук, и худи. У рюкзака широкие красные лямки и светоотражающие элементы — вас заметят и днём, и ночью.",
        id: 0,
        preview: "http://qa-games.ru/astore/public/images/15932051.jpeg",
        price: 4999,
        title: "Рюкзак «Для умных и свободных»",
      },
    ];

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(data),
    });

    const dispatch = jest.fn();
    const thunk = fetchProducts();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await thunk(dispatch, () => {}, "products/fetchData");

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [pending, fullfiled] = calls;
    expect(pending[0].type).toBe(fetchProducts.pending.type);
    expect(fullfiled[0].type).toBe(fetchProducts.fulfilled.type);
    expect(fullfiled[0].payload).toBe(data);
  });

  test("Fetch products with rejected response", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      statusText: "Возникла ошибка",
    });

    const dispatch = jest.fn();
    const thunk = fetchProducts();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await thunk(dispatch, () => {}, "products/fetchData");

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [pending, rejected] = calls;
    expect(pending[0].type).toBe(fetchProducts.pending.type);
    expect(rejected[0].type).toBe(fetchProducts.rejected.type);
    expect(rejected[0].error.message).toBe("Возникла ошибка");
  });
});
