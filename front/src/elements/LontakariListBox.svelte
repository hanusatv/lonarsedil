<div class="employee-list-item">
    <div class="background-gradient" />
</div>

<style>
    .employee-list-item {
        display: block;
        height: 3em;
        width: 100%;
        border-bottom: 1px solid var(--lines-color);
        overflow: hidden;
    }

    .background-gradient {
        position: relative;
        height: 100%;
        width: 100%;
        background: linear-gradient(
            to right,
            transparent 0%,
            transparent 30%,
            var(--primary-color) 50%,
            transparent 70%,
            transparent 100%
        );
        animation: color-loading 2.5s ease-out infinite;
    }

    @keyframes color-loading {
        0% {
            left: -100%;
        }
        100% {
            left: 80%;
        }
    }
</style>
