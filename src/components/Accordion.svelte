
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



<style>
  .tab {
	 width: 100%;
	 color: white;
	 overflow: hidden;
  }
  .tab-label {
    display: flex;
    justify-content: space-between;
    padding: 1em;
    background: #113548;
    font-weight: bold;
    cursor: pointer;
    /* Icon */
  }
  .tab-label:hover {
    background: #0e2a38;
  }
  .tab-label::after {
    content: "\276F";
    width: 1em;
    height: 1em;
    text-align: center;
    transition: all 0.35s;
  }
  .tab-content {
    max-height: 0;
    padding: 0 1em;
    color: #113548;
    background: white;
    transition: all 0.35s;
    overflow: hidden;
  }
  .tab .tab-content.expanded {
    max-height: 500vh;
    padding: 1em;
  }
  .tab .tab-label.expanded {
    background: #1a252f;
  }
  .tab .tab-label.expanded::after {
    transform: rotate(90deg);
  }
</style>
