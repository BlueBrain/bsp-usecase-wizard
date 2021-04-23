
<script lang="ts">
  let isExpanded = false;
</script>



<div class="accordion-container">
  <div class="tab">
    <div
      class="tab-label { isExpanded ? 'expanded' : '' }"
      on:click={ () => isExpanded = !isExpanded }
    >
      <slot name="header"></slot>
    </div>

    <div class="tab-content { isExpanded ? 'expanded' : '' }">
      <slot name="content"></slot>
    </div>
    <slot></slot>
  </div>
</div>



<style type="text/scss">
  $midnight: #2c3e50;
  $clouds: #ecf0f1;

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
    
    .tab-content.expanded {
      max-height: 500vh;
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
