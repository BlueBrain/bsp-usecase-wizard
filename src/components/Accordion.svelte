
<script lang="ts">
  let isExpanded = false;
</script>



<div class="container">
  <div class="tab">
    <label
      class="tab-label { isExpanded ? 'expanded' : '' }"
      on:click={ () => isExpanded = !isExpanded }
    >
      <slot name="header"></slot>
    </label>

    <div class="tab-content { isExpanded ? 'expanded' : '' }">
      <slot name="content"></slot>
    </div>
  </div>
</div>



<style type="text/scss">
  $midnight: #2c3e50;
  $clouds: #ecf0f1;

  body {
    color: $midnight;
    background: $clouds;
    padding: 0 1em 1em;
  }

  .tab {
    width: 100%;
    color: white;
    overflow: hidden;
    &-label {
      display: flex;
      justify-content: space-between;
      padding: 1em;
      background: $midnight;
      font-weight: bold;
      cursor: pointer;
      /* Icon */
      &:hover {
        background: darken($midnight, 10%);
      }
      &::after {
        content: "\276F";
        width: 1em;
        height: 1em;
        text-align: center;
        transition: all .35s;
      }
    }
    &-content {
      max-height: 0;
      padding: 0 1em;
      color: $midnight;
      background: white;
      transition: all .35s;
    }
    &-close {
      display: flex;
      justify-content: flex-end;
      padding: 1em;
      font-size: 0.75em;
      background: $midnight;
      cursor: pointer;
      &:hover {
        background: darken($midnight, 10%);
      }
    }
    
    .tab-content.expanded {
      max-height: 100vh;
      padding: 1em;
    }

    .tab-label.expanded {
      background: darken($midnight, 10%);
      &::after {
        transform: rotate(90deg);
      }
    }
  }
</style>
