import { fetchGroups } from "../slice/slice";

global.fetch = jest.fn();

describe("Groups thunk", () => {
  test("Fetch groups with resolved response", async () => {
    const data = [
      {
        id: 0,
        title: "Бархатные стикеры",
        description: "Тактильный антистресс",
        products: [[{}], [{}], [{}]],
      },
    ];

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(data),
    });

    const dispatch = jest.fn();
    const thunk = fetchGroups();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await thunk(dispatch, () => {}, "groups/fetchData");

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [pending, fullfiled] = calls;
    expect(pending[0].type).toBe(fetchGroups.pending.type);
    expect(fullfiled[0].type).toBe(fetchGroups.fulfilled.type);
    expect(fullfiled[0].payload).toBe(data);
  });

  test("Fetch groups with rejected response", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      statusText: "Возникла ошибка при обработке групп",
    });

    const dispatch = jest.fn();
    const thunk = fetchGroups();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await thunk(dispatch, () => {}, "products/fetchData");

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [pending, rejected] = calls;
    expect(pending[0].type).toBe(fetchGroups.pending.type);
    expect(rejected[0].type).toBe(fetchGroups.rejected.type);
    expect(rejected[0].error.message).toBe(
      "Возникла ошибка при обработке групп"
    );
  });
});
