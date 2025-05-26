<script lang="ts">
    const keys: { [key: string]: { isDown: boolean } } = {
        w: { isDown: false },
        a: { isDown: false },
        s: { isDown: false },
        d: { isDown: false },
        e: { isDown: false },
        c: { isDown: false },
        space: { isDown: false },
    };

    const press = (e: KeyboardEvent, isDown: boolean) => {
        e.preventDefault();
        const { key } = e;
        keys[key].isDown = isDown;
    };

    document.addEventListener("keydown", (e) => press(e, true));
    document.addEventListener("keyup", (e) => press(e, false));
</script>
